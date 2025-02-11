import { useEffect } from 'react'
import {
  Divider
} from 'antd'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import logo from '@/assets/logo.svg';
import { transferPost } from '@/authority/services'
const URL_M = {
  login: 'api.login',
}
function Page(props) {
  const { documentTitle } = useModel('global')
  useEffect(() => {
    localStorage.removeItem('token')
  }, [])
  const handleSubmit = async values => {
    const res = await transferPost(URL_M['login'], values);
    if (res.code == 200) {
      const { token } = res.data
      localStorage.setItem('token', token)
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    }
  }
  return <>
    <Helmet><title>{`登录页 - ${documentTitle}`}</title></Helmet>
    <LoginForm
      contentStyle={{
        minWidth: 280,
        maxWidth: '75vw',
      }}
      logo={<img alt="logo" src={logo} />}
      title={documentTitle}
      subTitle={`${documentTitle} 是西湖区最具影响力的 Web 设计规范`}
      initialValues={{

      }}
      onFinish={async (values) => {
        await handleSubmit(values);
      }}
    >
      <Divider plain style={{ color: '#777', borderColor: '#e4e4e4' }}>账户密码登录</Divider>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder={'用户名'}
        rules={[{ required: true, message: '请输入用户名!' }]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder='密码'
        rules={[{ required: true, message: '请输入密码！', },]}
      />
    </LoginForm>
  </>
}
export default Page