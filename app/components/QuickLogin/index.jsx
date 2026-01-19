import { memo, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
    Button,
    Form,
    Input,
    ConfigProvider
} from 'antd'
import { useUserStore } from '@/store/userStore'
import { useThemeStore } from '@/store/themeStore'
import { lightTheme, darkTheme } from '@/utils/theme'
import { transferPost } from '@/services'
import ThemeToggle from '@/components/Navigation/components/ThemeToggle'
import logo from '@/assets/logo.png';
const URL_M = {
    login: 'api.login'
}
const LoginWrap = memo(() => {
    const [loading, setLoading] = useState(false)
    const { fetchCurrent, clear } = useUserStore()
    useEffect(() => {
        clear()
    }, [])
    const handleSubmit = async values => {
        setLoading(true)
        const res = await transferPost(URL_M['login'], values);
        if (res?.code === 200) {
            const { token } = res.data;
            localStorage.setItem('token', token);
            fetchCurrent()
            setLoading(false)
            login.hide()
        }
        setLoading(false)
    }
    return <div className='flex flex-col gap-4 mt-4'>
        <Form
            name="login"
            onFinish={handleSubmit}
        >
            <Form.Item
                name="account"
                rules={[{ required: true, message: '请输入账号!' }]}
            >
                <Input allowClear className='p-3!' size={'large'} placeholder="请输入账户" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
            >
                <Input.Password className='p-3!' type="password" size={'large'} placeholder="请输入密码" />
            </Form.Item>
            <Button block loading={loading} type="primary" className='p-3! h-auto!' size={'large'} htmlType="submit">
                登录
            </Button>
        </Form>
    </div>
})
export const Bulk = (props) => {
    const { allowClose = false } = props
    const { theme: currentTheme } = useThemeStore()
    const themeConfig = currentTheme === 'dark' ? darkTheme : lightTheme
    const title = window.sysTitle;
    return <ConfigProvider theme={themeConfig}>
        <div className={`fixed top-0 left-0 z-999 size-full bg-yy-50`} onClick={(e) => { allowClose && login.hide() }}>
            <div className="login-background absolute left-0 top-0 size-full"></div>
            <div className="absolute top-0 left-0 size-full z-20 flex justify-center items-center">
                <div className="absolute top-10 right-10">
                    <ThemeToggle />
                </div>
                <div className={`min-w-[426px] min-h-[200px] bg-yy-50 rounded-2xl p-8 flex flex-col justify-center shadow-primary-500/10`} onClick={(e) => { e.stopPropagation() }}>
                    <div className='flex justify-center items-center gap-2'>
                        <img src={logo} alt="logo" width={48}/>
                        <span className="text-xl font-bold text-yy-950 hover:text-primary-300">{title}</span>
                    </div>
                    <LoginWrap/>
                </div>                
            </div>
        </div>
    </ConfigProvider>
}
export const login = {
    el: null,
    show: (allowClose) => {
        if (login.el) return
        login.el = document.createElement('div')
        document.body.appendChild(login.el)
        const root = ReactDOM.createRoot(login.el)
        root.render(<Bulk allowClose={allowClose} />)
    },
    hide: () => {
        if (!login.el) return
        document.body.removeChild(login.el)
        login.el = null
    }
}