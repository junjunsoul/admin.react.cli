import { memo, useMemo } from 'react'
import {
  Checkbox,
  Col,
  Row,
  Card,
  Alert
} from 'antd'
import { intersection, isEqual, uniq } from 'lodash'
import { getAllRouteHandles } from '@/utils/collectRouteHandles'
import { getPath } from '@/services'
import { commonPermissions } from './commonPermissions'
import { Level1Map, Level2Map } from '@/utils/enumMenu'

/**
 * 权限树节点组件
 * 每个页面的权限配置
 */
function AuthTree(props) {
  const {
    pageHandle,
    value = [],
    onChange
  } = props

  // 获取该页面所有权限项的 key
  const permissionKeys = useMemo(() => {
    return Object.keys(pageHandle.permission || {})
  }, [pageHandle])

  // 计算已选中的权限项
  const selectedKeys = useMemo(() => {
    return permissionKeys.filter(key => {
      const permConfig = pageHandle.permission[key]
      const apiUrls = permConfig?.apis || []
      // 将接口映射转为实际URL
      const actualUrls = apiUrls.map(api => getPath(api)?.toLowerCase())
      // 检查是否所有接口都已选中
      return isEqual(
        intersection(actualUrls, value.map(v => v?.toLowerCase())),
        actualUrls
      )
    })
  }, [value, permissionKeys, pageHandle])

  // 全选/取消全选该页面
  const checkAll = (checked) => {
    if (!onChange) return
    
    const allApis = permissionKeys
      .map(key => pageHandle.permission[key]?.apis || [])
      .flat()
      .map(api => getPath(api))
      .filter(Boolean)
    
    let result = []
    if (checked) {
      result = uniq([...value, ...allApis])
    } else {
      result = value.filter(v => !allApis.includes(v))
    }
    
    // 只在值真正改变时才调用 onChange
    if (!isEqual(result.sort(), value.sort())) {
      onChange(result)
    }
  }

  // 切换单个权限项
  const checkChange = (key) => {
    if (!onChange) return
    
    const permConfig = pageHandle.permission[key]
    const apiUrls = (permConfig?.apis || [])
      .map(api => getPath(api))
      .filter(Boolean)
    
    let result = []
    const actualUrls = apiUrls.map(v => v?.toLowerCase())
    const valueUrls = value.map(v => v?.toLowerCase())
    
    // 判断是否已全部选中
    if (isEqual(intersection(actualUrls, valueUrls), actualUrls)) {
      // 取消选中
      result = value.filter(v => !apiUrls.includes(v))
    } else {
      // 选中
      result = uniq([...value, ...apiUrls])
    }
    
    // 只在值真正改变时才调用 onChange
    if (!isEqual(result.sort(), value.sort())) {
      onChange(result)
    }
  }

  return <>
    <div>
      <Checkbox 
        indeterminate={selectedKeys.length > 0 && selectedKeys.length < permissionKeys.length} 
        checked={selectedKeys.length === permissionKeys.length && permissionKeys.length > 0} 
        onChange={e => checkAll(e.target.checked)}
      >
        {pageHandle.title}
      </Checkbox>
    </div>
    {permissionKeys.map(key => {
      const permConfig = pageHandle.permission[key]
      return (
        <div key={key} style={{ paddingLeft: 22 }}>
          <Checkbox 
            checked={selectedKeys.includes(key)} 
            onChange={() => checkChange(key)}
          >
            {permConfig?.title || key}
          </Checkbox>
        </div>
      )
    })}
  </>
}

/**
 * 将页面配置按分组组织成树结构
 */
function buildAuthMenuTree(handles) {
  const tree = {}
  
  handles.forEach(handle => {
    // 只要有权限配置，就显示在授权界面（不管 menu.show 的值）
    if (!handle.permission || Object.keys(handle.permission).length === 0) {
      return
    }

    // 获取菜单配置，如果没有则使用默认值
    const menu = handle.menu || {}
    const level1 = menu.level_1 || 'other'
    const level2 = menu.level_2 || level1
    
    // 初始化一级分组
    if (!tree[level1]) {
      tree[level1] = {
        title: getGroupTitle(level1),
        children: {},
        order: getGroupOrder(level1)
      }
    }
    
    // 初始化二级分组
    if (!tree[level1].children[level2]) {
      tree[level1].children[level2] = {
        title: getGroupTitle(level2),
        pages: [],
        order: getGroupOrder(level2)
      }
    }
    
    // 添加页面（按 order 排序）
    tree[level1].children[level2].pages.push(handle)
  })
  
  // 对分组和页面进行排序
  Object.values(tree).forEach(level1 => {
    Object.values(level1.children).forEach(level2 => {
      level2.pages.sort((a, b) => {
        const orderA = a.menu?.order || 999
        const orderB = b.menu?.order || 999
        return orderA - orderB
      })
    })
  })
  
  return tree
}

/**
 * 获取分组标题
 * 优先从 enumMenu 中读取，找不到则使用默认值
 */
function getGroupTitle(key) {
  // 先尝试从 Level2Map 读取（二级菜单）
  if (Level2Map[key]) {
    return Level2Map[key].title
  }
  
  // 再尝试从 Level1Map 读取（一级菜单）
  if (Level1Map[key]) {
    return Level1Map[key].title
  }
  
  // 使用默认值（用于公共权限等特殊分组）
  const defaultTitleMap = {
    'common': '公共权限',
  }
  
  return defaultTitleMap[key] || key
}

/**
 * 获取分组排序
 */
function getGroupOrder(key) {
  const orderMap = {
    'common': 0,
    'settings': 1,
    'settings.system': 1,
    'other': 999
  }
  return orderMap[key] || 100
}

/**
 * 授权组件主入口
 */
const Auth = memo(props => {
  const { value = [], onChange } = props
  
  // 获取所有路由的 handle 配置，并添加公共权限
  const allHandles = useMemo(() => {
    return [commonPermissions, ...getAllRouteHandles()]
  }, [])
  
  // 构建权限树
  const authTree = useMemo(() => buildAuthMenuTree(allHandles), [allHandles])
  
  // 对一级分组排序
  const sortedLevel1 = Object.entries(authTree)
  
  return (
    <>
      <Alert
        title="提示"
        description="公共权限是所有角色都必须拥有的基础权限，建议始终勾选。"
        type="info"
        showIcon
        closable
        style={{ marginBottom: 10 }}
      />
      {sortedLevel1.map(([level1Key, level1Data]) => {
        // 公共权限使用特殊样式
        const isCommon = level1Key === 'common'
        return (
          <Card
            size="small"
            title={level1Data.title}
            style={{ 
              marginTop: 5,
            }}
            key={level1Key}
          >
            <Row>
              {Object.entries(level1Data.children)
                .sort((a, b) => (a[1].order || 999) - (b[1].order || 999))
                .map(([level2Key, level2Data]) => {
                  return level2Data.pages.map((pageHandle, idx) => (
                    <Col span={8} key={`${level2Key}-${idx}`} style={{ marginBottom: 10 }}>
                      <AuthTree 
                        pageHandle={pageHandle} 
                        value={value}
                        onChange={onChange}
                      />
                    </Col>
                  ))
                })}
            </Row>
          </Card>
        )
      })}
    </>
  )
})

Auth.displayName = 'Auth'

export default Auth