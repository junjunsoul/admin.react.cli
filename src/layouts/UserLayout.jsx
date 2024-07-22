import { Outlet } from '@umijs/max';
import Footer from '@/components/Footer'
import styles from './UserLayout.less';

const Page = props => {
  return (
    <div className={styles.container}>
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default Page
