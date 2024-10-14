
import { useMemo, memo } from 'react'
import { Menu } from 'antd'
import { history } from '@umijs/max';
import { getMenus } from '@/authority/auth';
import { 
    LeftOutlined,
    RightOutlined, 
} from '@ant-design/icons';
import style from './styles.less'
const Page = memo((props) => {
    const { 
        collapsed=false,
        dispatch,
        pathname, 
        authority,
    } = props
    const menuData = useMemo(() => {
        return getMenus(authority).map(row => row.children.map((r, index) => ({ ...r, key: 'row_' + index }))).flat(1).map(row => {
            if (row.children) {
                return { ...row, children: row.children.map(r => ({ ...r, key: r.path })) }
            } else {
                return { ...row, key: row.path }
            }
        })
    }, [])
    const selectKey = useMemo(()=>{
       return menuData.find(row=>JSON.stringify(row).indexOf(pathname)>-1)?.key
    },[pathname])
    
    const onClick = ({key})=>{
        history.push(key)
    }
    const onCollapsed = ()=>{
        dispatch({ 
                type: 'global/saveState',
                payload:{
                collapsed:!collapsed
            }
        })
    }
    return <div className={`${style.left} ${collapsed?style.min:style.active}`}>
        <a className={style.tag} onClick={onCollapsed}>
            {collapsed?<RightOutlined className={style.icon} />:<LeftOutlined className={style.icon} />}
        </a>
        <div style={{width:'100%',height:'100%',overflowY:'auto',scrollbarWidth:'none'}}>
            <Menu
                defaultSelectedKeys={pathname}
                defaultOpenKeys={[selectKey]}
                onClick={onClick}
                style={{minHeight:'100%',width:'100%'}}
                mode="inline"
                inlineCollapsed={collapsed}
                items={menuData}
            />            
        </div>
    </div>
})
export default Page