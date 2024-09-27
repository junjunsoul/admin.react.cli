
import { useMemo, memo } from 'react'
import { Menu } from 'antd'
import { history } from '@umijs/max';
import { getMenus } from '@/authority/auth';
import style from './styles.less'
const Page = memo((props) => {
    const { pathname, authority } = props
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
    return <div className={`${style.left}`}>
        <Menu
            defaultSelectedKeys={pathname}
            defaultOpenKeys={[selectKey]}
            onClick={onClick}
            mode="inline"
            inlineCollapsed={false}
            items={menuData}
        />
    </div>
})
export default Page