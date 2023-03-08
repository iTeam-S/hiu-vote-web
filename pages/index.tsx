import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import Participant from '../components/participant';
import styles from '../styles/Home.module.css';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  if (typeof window !== 'undefined') {
    console.log('You are on the browser');
  } else {
    console.log('You are on the server');
  }

  return (
    <section className={styles.main}>
      <h1 style={{textAlign: 'center', color: '#555', marginTop: 70}}>Zakanao ngah ?</h1>
      <Participant />
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
