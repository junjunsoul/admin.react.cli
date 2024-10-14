import React from 'react';
import {
  Switch
} from 'antd'
import { SelectLang } from '@umijs/max'
import Avatar from './AvatarDropdown';
import styles from './index.less';
const GlobalHeaderRight = props => {
  const {
    theme = 'TOP',
    dispatch
  } = props
  const changeTheme = (checked)=>{
    let theme = checked?'TOP':'LEFT'
    localStorage.setItem('PRO_THEME',theme)
    dispatch({ type: 'global/saveState',payload:{
        theme,
        collapsed:false
    }})
  }
  return (
    <div className={styles.right}>
      <Switch
        checked={theme === 'TOP'}
        onChange={changeTheme}
        checkedChildren="TOP"
        unCheckedChildren="LEFT"
      />
      <SelectLang/>
      <Avatar {...props} />
    </div>
  );
};

export default GlobalHeaderRight
