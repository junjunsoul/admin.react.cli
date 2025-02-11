import { Outlet, Helmet, useLocation, useSelectedRoutes, Link,useModel } from '@umijs/max';
import { memo } from 'react'
import Footer from '@/components/Footer'
import { Button, Result, Watermark } from 'antd';
import { find } from 'lodash'
import TopNavHeader from '@/components/TopNavHeader';
import SideMenu from '@/components/SideMenu';
import { checkAuth, getFMFuzzy } from '@/authority/auth';
import styles from './styles.less';
import logo from '@/assets/logo.svg'
const Authorized = memo((props) => {
    const {
        authority = [],
        currentUser: {
            realname,
        }
    } = useModel('user')
    const { pathname } = useLocation()
    if (checkAuth(pathname, authority)) {
        let authorized = Object.assign({}, getFMFuzzy(pathname, authority));
        // return <Watermark content={realname}><Outlet context={{ authorized }} /></Watermark>
        return <Outlet context={{ authorized }} />
    } else {
        return <Result
            status={403}
            title="403"
            subTitle="Sorry, 你没有权限访问当前页面哦."
            extra={
                <Button type="primary">
                    <Link to="/">返回首页</Link>
                </Button>
            }
        />
    }
})
function Page(props) {
    const { documentTitle, collapsed, theme } = useModel('global')
    const { pathname } = useLocation()
    const route = find(useSelectedRoutes(), { pathname }).route
    const paddingLeft = theme == 'TOP' ? 0 : collapsed ? 60 : 256
    const paddingTop = theme == 'TOP' ? 0 : 64
    return <>
        <Helmet><title>{`${route.name} - ${documentTitle}`}</title></Helmet>
        <TopNavHeader logo={logo} pathname={pathname} {...props} />
        {theme == 'LEFT' && <SideMenu pathname={pathname} {...props} />}
        <div style={{ paddingLeft, paddingTop }} className={styles.wrap}>
            <Authorized {...props} />
            <Footer />
        </div>
    </>
}
export default Page