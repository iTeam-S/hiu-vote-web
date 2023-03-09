<<<<<<< HEAD
import { useEffect, useState } from 'react'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout'
import Participant from '../components/participant'
import { getVoters } from '../components/query/voters.query'
import { pb, VotersList } from '../components/type'
import Voters from '../components/voters'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './page'
=======
import { useEffect, useState } from 'react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import Participant from '../components/participant';
import { getVoters } from '../components/query/voters.query';
import { pb, VotersList } from '../components/type';
import Voters from '../components/voters';
import styles from '../styles/Home.module.css';
import { NextPageWithLayout } from './page';
>>>>>>> origin/main

const Home: NextPageWithLayout = () => {
  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
  } else {
    console.log('You are on the server')
  }
<<<<<<< HEAD
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
=======
  const [nbrVoters, setNbrVoters] = useState<number>(0);
  const [voters, setVoters] = useState<VotersList | null>(null);
  async function fetchVoters() {
    const votersList = await getVoters();
    setNbrVoters(votersList.totalItems);
    setVoters(votersList);
  }
  useEffect(() => {
    fetchVoters();
  }, []);

  useEffect(() => {
    pb.collection('voters').subscribe('*', function () {
      fetchVoters();
    });
  });
>>>>>>> origin/main
  return (
    <section className={styles.main}>
      <div className={styles.styledtext}>
        <h1 className={styles.text}>
          Alainao <span style={{ color: '#555' }}>sa</span>
          <span>Zakanao ?</span>
        </h1>
      </div>
<<<<<<< HEAD
      <Participant nbrVoters={nbrVoters} />
      {voters?.items && <Voters items={voters.items} />}
=======
      <Participant nbrVoters={nbrVoters}/>
      {
        voters?.items && <Voters items={voters.items}/>
      }
>>>>>>> origin/main
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
