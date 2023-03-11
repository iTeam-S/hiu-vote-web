import { useEffect, useState } from 'react'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout'
import Participant from '../components/participant'
import Particle from '../components/particles'
import { getVoters } from '../components/query/voters.query'
import { pb, VotersList } from '../components/type'
import Voters from '../components/voters'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './page'
import MessengerComponent from 'react-messenger-customer-chat';

const Home: NextPageWithLayout = () => {
  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
  } else {
    console.log('You are on the server')
  }
  const [nbrVoters, setNbrVoters] = useState<number>(0)
  const [voters, setVoters] = useState<VotersList | null>(null)

  async function fetchVoters() {
    const votersList = await getVoters()
    setNbrVoters(votersList.totalItems)
    setVoters(votersList)
  }
  useEffect(() => {
    fetchVoters()
  }, [])

  useEffect(() => {
    pb.collection('voters').subscribe('*', function () {
      fetchVoters()
    })
  })
  return (
    <section className={styles.main}>
      <div className={styles.styledtext}>
        <div>
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
      <Participant nbrVoters={nbrVoters} />
      {voters?.items && <Voters items={voters.items} />}
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
