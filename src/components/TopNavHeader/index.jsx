import { Link, useModel } from '@umijs/max';
import TopMenu from '@/components/TopMenu';
import RightContent from '@/components/GlobalHeader/RightContent'
import { getMenus } from '@/authority/auth';
import styles from './index.less';

export default function TopNavHeader(props) {
  const {
    logo,
  } = props;
  const { documentTitle, theme } = useModel('global')
  const { authority } = useModel('user')
  let menuData = getMenus(authority)
  const position = theme == 'TOP' ? 'relative' : 'fixed'
  return <div className={`${styles.head}`} style={{ position }}>
    <div className={`${styles.main}`}>
      <div className={styles.left}>
        <div className={styles.logo} key="logo" id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>{documentTitle}</h1>
          </Link>
        </div>
        {theme == 'TOP' && <TopMenu menuData={menuData} {...props} />}
      </div>
      <RightContent {...props} />
    </div>
  </div>
}
