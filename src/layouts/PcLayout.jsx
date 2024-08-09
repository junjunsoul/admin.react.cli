import { Outlet, Helmet, useLocation, useSelectedRoutes,Link } from '@umijs/max';
import { memo } from 'react'
import Footer from '@/components/Footer'
import { Button, Result } from 'antd';
import { find } from 'lodash'
import TopNavHeader from '@/components/TopNavHeader';
import { checkAuth, getFMFuzzy } from '@/authority/auth';
import logo from '@/assets/logo.svg'
const Authorized = memo((props)=> {
    const {
        authority = []
    } = props
    const { pathname } = useLocation()
    if (checkAuth(pathname, authority)) {
        let authorized = Object.assign({}, getFMFuzzy(pathname, authority));
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
    const {
        documentTitle
    } = props
    const { pathname } = useLocation()
    const route = find(useSelectedRoutes(),{pathname}).route
    return <>
        <Helmet><title>{`${route.name} - ${documentTitle}`}</title></Helmet>
        <TopNavHeader logo={logo} pathname={pathname} {...props} />
        <Authorized {...props} />
        <Footer />
    </>
}
export default Page