import { useSelectedRoutes, useModel } from '@umijs/max';
import { Breadcrumb } from "antd";
import styles from './style.less'
function Page(props) {
    const items = useSelectedRoutes().map(r => ({ title: r.route.name })).filter(r => r.title)
    const { theme } = useModel('global')
    const { children } = props
    return <>
        {theme == 'TOP' && <div className={styles.breadcrumb}><Breadcrumb items={items} /></div>}
        {children}
    </>
}
export default Page