import React from 'react';
import { SelectLang } from '@umijs/max'
import Avatar from './AvatarDropdown';
import styles from './index.less';
const GlobalHeaderRight = props => {
  return (
    <div className={styles.right}>
      <SelectLang/>
      <Avatar {...props} />
    </div>
  );
};

export default GlobalHeaderRight
