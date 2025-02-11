import React from 'react';
import {
  Switch
} from 'antd'
import { SelectLang, useModel } from '@umijs/max'
import Avatar from './AvatarDropdown';
import styles from './index.less';
const GlobalHeaderRight = props => {
  const { theme, setTheme, setCollapsed } = useModel('global')
  const changeTheme = (checked) => {
    let theme = checked ? 'TOP' : 'LEFT'
    localStorage.setItem('PRO_THEME', theme)
    setTheme(theme)
    setCollapsed(false)
  }
  return (
    <div className={styles.right}>
      <Switch
        checked={theme === 'TOP'}
        onChange={changeTheme}
        checkedChildren="TOP"
        unCheckedChildren="LEFT"
      />
      <SelectLang />
      <Avatar {...props} />
    </div>
  );
};

export default GlobalHeaderRight
