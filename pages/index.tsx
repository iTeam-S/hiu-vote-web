import React from 'react'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout'
import FooterLayout from '../components/layouts/footer/FooterLayout'
import Participant from '../components/participant'
import Particle from '../components/particles'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './page'
import Contrib from '../components/contrib/contrib'
import MessengerComponent from 'react-messenger-customer-chat'
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button'
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import TypingEffect from '../components/typing/typing'

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

/* Track a page view */
analytics.page()
