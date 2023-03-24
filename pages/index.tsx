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
import Sponsor from '../components/sponsor/sponsor'
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

/* maintain */
// import 'react-under-construction/build/css/index.css' // note: comment/uncomment this line when maintenance mode is inactive/active
export const maintainStatus = false

/* fake data for sponsor carousel */
const sponsorData = [
  {
    id: '1',
    title: 'title 1',
    url: 'https://source.unsplash.com/random/250x250',
  },
  {
    id: '2',
    title: 'title 2',
    url: 'https://source.unsplash.com/random/250x250',
  },
  {
    id: '3',
    title: 'title 3',
    url: 'https://source.unsplash.com/random/250x250',
  },
  {
    id: '4',
    title: 'title 4',
    url: 'https://source.unsplash.com/random/250x250',
  },
  {
    id: '5',
    title: 'title 5',
    url: 'https://source.unsplash.com/random/250x250',
  },
  {
    id: '6',
    title: 'title 6',
    url: 'https://source.unsplash.com/random/250x250',
  },
]

// ===========================================================

const Home: NextPageWithLayout = () => {
  return (
    <section className={styles.main}>
      {!maintainStatus ? (
        <>
          {/* <div className="messenger">
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
          <Participant /> */}
          <Sponsor data={sponsorData} />
          <Contrib />
          {/* <ScrollUpButton ContainerClassName="scrollup" /> */}
          {/* <Particle /> */}
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
    <>
      {!maintainStatus ? (
        <PrimaryLayout>
          <SidebarLayout />
          {page}
          <FooterLayout />
        </PrimaryLayout>
      ) : (
        <>{page}</>
      )}
    </>
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
