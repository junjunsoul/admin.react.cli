import { useRef } from 'react'
import { Avatar, Popover, Button } from 'antd';
import { useUserStore } from '@/store/userStore'
import { LogoutOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash'
import Icon from '@/components/Icon'
import { EditPassword, EditUserInfo } from './Setting'
function AvatarDropdown(props) {
  const { placement = "bottom", showName = true } = props
  const { logout, user } = useUserStore();
  const passwordRef = useRef(null)
  const userInfoRef = useRef(null)
  const onMenuClick = key => {
    if (key === 'logout') {
      logout()
      return;
    }
    if (key === 'password') {
      passwordRef.current.show()
      return;
    }
    if (key === 'user') {
      userInfoRef.current.show()
      return;
    }
  };
  let items = [
    {
      label: "账号设置",
      icon: <UserOutlined />,
      key: 'user',
    },
    {
      label: "修改密码",
      icon: <LockOutlined />,
      key: 'password',
    },
    {
      label: "退出登录",
      icon: <LogoutOutlined />,
      key: 'logout',
    },
  ];
  const content = <div className='flex flex-col'>
    {items.map(row => <div key={row.key} onClick={() => onMenuClick(row.key)} className='flex items-center gap-2 hover:text-primary-400 p-2 cursor-pointer'>
      {row.icon}
      <span>{row.label}</span>
    </div>)}
  </div>
  if (!isEmpty(user)) {
    return <div className='flex gap-2 items-center'>
      <Popover content={content} placement={placement}>
        <span className={`cursor-pointer`}>
          <Avatar size={'large'} src={`${user.avatar_url}?x-tos-process=image/resize,w_38`} alt="avatar" />
        </span>
      </Popover>
      <span className='text-yy-400 text-sm'>{user.nick_name}</span>
      <EditPassword ref={passwordRef} />
      <EditUserInfo ref={userInfoRef} />
    </div>
  } else {
    return null
  }
}

export default AvatarDropdown

