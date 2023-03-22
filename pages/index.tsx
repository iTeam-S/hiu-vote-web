import React from 'react'

/* next */
import { NextPageWithLayout } from './page'

/* components */
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout'
import FooterLayout from '../components/layouts/footer/FooterLayout'
import Participant from '../components/participant'
import Particle from '../components/particles'
import Contrib from '../components/contrib/contrib'
import TypingEffect from '../components/typing/typing'

/* libs */
import MessengerComponent from 'react-messenger-customer-chat'
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button'
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

/* styles */
import styles from '../styles/home.module.css'

// ===========================================================

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
        <TypingEffect
          user="voters"
          host="hiu"
          lists={["echo 'Alainao ?'", "echo 'Zakanao ?'"]}
          root={false}
        />
      </div>
      <Participant />
      <Contrib />
      <ScrollUpButton ContainerClassName="scrollup" />
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
      <FooterLayout />
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

analytics.page()
