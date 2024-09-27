import { Link } from '@umijs/max';
import TopMenu from '@/components/TopMenu';
import RightContent from '@/components/GlobalHeader/RightContent'
import { getMenus } from '@/authority/auth';
import styles from './index.less';

export default function TopNavHeader(props) {
  const { authority, logo, documentTitle,theme } = props;
  let menuData = getMenus(authority)
  return <div className={`${styles.head}`}>
    <div className={`${styles.main}`}>
      <div className={styles.left}>
        <div className={styles.logo} key="logo" id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{documentTitle}</h1>
          </Link>
        </div>
        {theme=='TOP'&&<TopMenu menuData={menuData} {...props} />}
      </div>
      <RightContent {...props} />
    </div>
  </div>
}
