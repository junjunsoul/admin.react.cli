import { memo, useMemo } from 'react'
import {
  Checkbox,
  Col,
  Row,
  Card
} from 'antd'
import { intersection, isEqual, map, uniq } from 'lodash'
import menus from '@/authority/auth/auth_menu'
import orm from '@/authority/auth/orm'
function AuthTree(props) {
  const {
    item,
    value = [],
    onChange
  } = props
  const authKeys = useMemo(() => {
    return Object.keys(item.fm)
  }, [])

  const selectKeys = useMemo(() => {
    return Object.keys(item.fm).filter(key => {
      let interfaces = orm[key] || []
      return isEqual(intersection(interfaces, value), interfaces)
    })
  }, [value])

  const checkAll = (checked) => {
    const allInterfaces = Object.keys(item.fm).map(r => orm[r] || []).flat(1)
    let result = []
    if (checked) {
      result = uniq([...value, ...allInterfaces])
    } else {
      result = [...value].filter(v => !allInterfaces.includes(v))
    }
    onChange(result)
  }

  const checkChange = key => {
    let interfaces = orm[key] || []
    let result = []

    if (isEqual(intersection(interfaces, value), interfaces)) {
      result = [...value].filter(v => !interfaces.includes(v))
    } else {
      result = uniq([...value, ...interfaces])
    }
    onChange(result)
    return result
  }
  return <>
    <div><Checkbox indeterminate={selectKeys.length > 0 && selectKeys.length < authKeys.length} checked={selectKeys.length == authKeys.length} onChange={e => checkAll(e.target.checked)}>{item.title}</Checkbox></div>
    {map(item.fm, (title, key) => <div key={key} style={{ paddingLeft: 22 }}>
      <Checkbox key={key} checked={selectKeys.includes(key)} onChange={e => checkChange(key)}>{title}</Checkbox>
    </div>)}
  </>
}
export default memo(props => {
  return menus.map((row, index) => {
    return <Card
      size="small"
      title={row.title}
      style={{ marginTop: 5 }}
      key={index}
    >
      <Row key={index}>
        {row.children.map((item, key) => {
          return <Col span={8} key={key} style={{ marginBottom: 10 }}><AuthTree item={item} {...props} /></Col>
        })}
      </Row>
    </Card>
  })
})