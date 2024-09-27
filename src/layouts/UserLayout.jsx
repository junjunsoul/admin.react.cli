import { Outlet } from '@umijs/max';
import Footer from '@/components/Footer'
import styles from './styles.less';

const Page = props => {
  return (
    <div className={styles.container}>
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default Page
