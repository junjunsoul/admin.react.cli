import { Avatar, Dropdown } from 'antd';
import { useIntl, useModel } from '@umijs/max'
import { LogoutOutlined,SettingOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';
function AvatarDropdown(props) {
  const { logout, currentUser } = useModel('user');
  const intl = useIntl();
  const onMenuClick = event => {
    const { key } = event;
    if (key === 'logout') {
      logout()
      return;
    }
    if (key === 'setting') {
      
      return;
    }
  };
  const items = [
    {
      label: intl.formatMessage({
        id: 'navBar.setting',
      }),
      icon:<SettingOutlined />,
      key: 'setting',
    },
    {
      label: intl.formatMessage({
        id: 'navBar.logout',
      }),
      icon:<LogoutOutlined />,
      key: 'logout',
    },
  ];
  return <Dropdown menu={{
    items,
    onClick: onMenuClick
  }}>
    <span className={`${styles.action} ${styles.account}`}>
      <Avatar size="small" className={styles.avatar} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
      <span className={`${styles.name} anticon`}>{currentUser.realname}</span>
    </span>
  </Dropdown>
}

export default AvatarDropdown

