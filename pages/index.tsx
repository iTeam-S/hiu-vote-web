import React from 'react'

/* next */
import { NextPageWithLayout } from './page'

/* layouts */
import PrimaryLayout from '../layouts/primary/PrimaryLayout'
import SidebarLayout from '../layouts/sidebar/SidebarLayout'
import FooterLayout from '../layouts/footer/FooterLayout'

/* components */
import Participant from '../components/participant/participant'
import Contrib from '../components/contrib/contrib'
import Particle from '../components/particles/particles'
import Typing from '../components/typing/typing'
import Maintain from '../components/maintain/maintain'

/* libs */
import MessengerComponent from 'react-messenger-customer-chat'
import { VerticleButton as ScrollUpButton } from 'react-scroll-up-button'
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

/* styles */
import styles from '../styles/home.module.css'

/* global */
const maintainStatus = true

// ===========================================================

const Home: NextPageWithLayout = () => {
  return (
    <section className={styles.main}>
      {!maintainStatus ? (
        <>
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
          <div className={styles.typingFixOnMobile}>
            <Typing
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
        </>
      ) : (
        <>
          <Particle />
          <Maintain />
        </>
      )}
    </section>
  )
}

export default Home

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {!maintainStatus ? (
        <>
          <SidebarLayout />
          {page}
          <FooterLayout />
        </>
      ) : (
        <>{page}</>
      )}
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
