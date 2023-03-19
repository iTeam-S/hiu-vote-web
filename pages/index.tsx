import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout'
import Participant from '../components/participant'
import Particle from '../components/particles'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './page'
import Contrib from '../components/contrib/contrib'

import MessengerComponent from 'react-messenger-customer-chat'
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button'

import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const Home: NextPageWithLayout = () => {
  return (
    <section className={styles.main}>
      <div className={styles.styledtext}>
        <div className="messenger">
          <MessengerComponent
            pageId="113804974982080"
            appId="1015807782342852"
            htmlRef="window.location.pathname"
            themeColor="#008080"
            loggedInGreeting="Pejy Facebook: HIU Cote 2023"
            language="fr_FR"
          />
        </div>
        <h1 className={styles.text}>
          Alainao <span style={{ color: '#555' }}>sa</span>
          <span>Zakanao ?</span>
        </h1>
      </div>
      <Participant />
      <Contrib />
      <div>
        <ScrollUpButton ContainerClassName="scrollup" />
      </div>
      <Particle />
    </section>
  )
}

export default Home

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  )
}

const analytics = Analytics({
  app: 'hiu-cote',
  plugins: [
    googleAnalytics({
      measurementIds: ['G-WWTMYD4K10'],
    }),
  ],
})

/* Track a page view */
analytics.page()
