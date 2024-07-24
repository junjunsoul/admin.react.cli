import { CopyrightOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './style.less'
const Footer = () => {
  return <footer style={{ padding: 0 }}>
    <div className={styles.copyright}>
      <span>Copyright <CopyrightOutlined /> 2024 技术中心出版</span>
    </div>
  </footer>
};

export default Footer;
