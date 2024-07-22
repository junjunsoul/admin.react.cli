import { useSelectedRoutes } from '@umijs/max';
import { Breadcrumb } from "antd";
import styles  from './style.less'
function Page(props) {
    const items = useSelectedRoutes().map(r=>({title:r.route.name})).filter(r=>r.title)
    const { children } = props
    return <>
        <div className={styles.breadcrumb}><Breadcrumb items={items}/></div>
        {children}
    </>
}
export default Page