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
    
    return <ConfigProvider theme={themeConfig}>
        <div className={` fixed top-0 left-0 flex justify-center items-center bg-yy-50 z-999 h-full w-full `} onClick={(e) => { allowClose && login.hide() }}>
            <div style={{backgroundImage:`url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')`,backgroundSize:'100% 100%'}} className={`min-w-[426px] min-h-[200px] border border-yy-300 rounded-lg p-4 flex flex-col justify-center`} onClick={(e) => { e.stopPropagation() }}>
                <div className='flex justify-center mb-6'>
                    React-Admin
                </div>
                <LoginWrap/>
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