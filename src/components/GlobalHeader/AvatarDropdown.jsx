import { Avatar, Dropdown } from 'antd';
import React from 'react';
import styles from './index.less';
function AvatarDropdown(props) {
  const {
    dispatch,
    currentUser,
  } = props
  const onMenuClick = event => {
    const { key } = event;
    if (key === 'logout') {
      dispatch({
        type: 'user/logout',
      });
      return;
    }
  };
  const items = [
    {
      label: '退出登录',
      key: 'logout',
    }
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

