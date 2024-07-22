import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';
const GlobalHeaderRight = props => {
  return (
    <div className={styles.right}>
      <Avatar {...props} />
    </div>
  );
};

export default GlobalHeaderRight
