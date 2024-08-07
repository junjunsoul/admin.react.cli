import { Avatar, Dropdown } from 'antd';
import { useIntl } from '@umijs/max'
import React from 'react';
import styles from './index.less';
function AvatarDropdown(props) {
  const {
    dispatch,
    currentUser,
  } = props
  const intl = useIntl();
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
      label: intl.formatMessage({
        id: 'navBar.logout',
      }),
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

