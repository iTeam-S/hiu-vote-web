import React, { useState, useEffect } from 'react'

/* next */
import Link from 'next/link'

/* components */
import Typing from '../typing/typing'

/* libs */
import { Line } from 'rc-progress'

/* types */
import { I_User, I_Stats, T_StatRender } from '../../types'

/* styles */
import styles from './contrib.module.css'

// ===========================================================

function Stats({
  id,
  frontend,
  backend,
  bot,
  fonctionnel,
  cm,
  devops,
  integrationAPI,
}: I_Stats) {
  const StatRender = ({ title, value }: T_StatRender) => {
    return (
      <>
        <span>{title}</span>{' '}
        <span className={styles.percentage}>({value}%)</span>
        <Line
          percent={value}
          strokeWidth={2}
          strokeColor="#41e0cb"
          trailColor="#444"
        />
      </>
    )
  }
  return (
    <React.Fragment>
      <ul key={id}>
        <li>
          <StatRender title="Frontend" value={frontend} />
        </li>
        <li>
          <StatRender title="Backend" value={backend} />
        </li>
        <li>
          <StatRender title="Bot" value={bot} />
        </li>
        <li>
          <StatRender title="Fonctionnel" value={fonctionnel} />
        </li>
        <li>
          <StatRender title="CM" value={cm} />
        </li>
        <li>
          <StatRender title="DevOps" value={devops} />
        </li>
        <li>
          <StatRender title="Integration API" value={integrationAPI} />
        </li>
      </ul>
    </React.Fragment>
  )
}

export default function Contrib() {
  const [githubProfilePics, setGithubProfilePics] = useState<string[]>([])
  //const realNames: string[] = ['Ntsoa', 'Raja', 'Damia', 'Gaetan', 'Rivo']
  const realNames: string[] = ['Ntsoa', 'Gaetan', 'Damia']
  /* const contribStats: I_Stats[] = [
    {
      id: 'Ntsoa',
      frontend: 95,
      backend: 70,
      bot: 5,
      fonctionnel: 50,
      cm: 50,
      devops: 5,
      integrationAPI: 50,
    },
    {
      id: 'Raja',
      frontend: 70,
      backend: 5,
      bot: 0,
      fonctionnel: 5,
      cm: 0,
      devops: 0,
      integrationAPI: 20,
    },
    {
      id: 'Damia',
      frontend: 0,
      backend: 0,
      bot: 0,
      fonctionnel: 70,
      cm: 100,
      devops: 0,
      integrationAPI: 0,
    },
    {
      id: 'Gaetan',
      frontend: 5,
      backend: 30,
      bot: 95,
      fonctionnel: 50,
      cm: 50,
      devops: 95,
      integrationAPI: 50,
    },
    /*   {
      id: 'Rivo',
      frontend: 0,
      backend: 5,
      bot: 75,
      fonctionnel: 10,
      cm: 0,
      devops: 0,
      integrationAPI: 5,
    },
  ]*/
  const contribStats: I_Stats[] = [
    {
      id: 'Ntsoa',
      frontend: 95,
      backend: 70,
      bot: 5,
      fonctionnel: 30,
      cm: 5,
      devops: 5,
      integrationAPI: 50,
    },
    {
      id: 'Gaetan',
      frontend: 5,
      backend: 30,
      bot: 95,
      fonctionnel: 35,
      cm: 5,
      devops: 95,
      integrationAPI: 50,
    },
    {
      id: 'Damia',
      frontend: 0,
      backend: 0,
      bot: 0,
      fonctionnel: 35,
      cm: 90,
      devops: 0,
      integrationAPI: 0,
    },
  ]

  /*const linkLinkedin: string[] = [
    'https://www.linkedin.com/in/manambintsoa/',
    'https://portfolio-raja.netlify.app/',
    'https://www.linkedin.com/mwlite/in/vololoniaina-damia-tsiafaratiana-b0394318a',
    'https://www.linkedin.com/in/gaetanj/',
    'https://www.linkedin.com/in/rajaonarivony/',
  ]*/
  const linkLinkedin: string[] = [
    'https://www.linkedin.com/in/manambintsoa/',
    'https://www.linkedin.com/in/gaetanj/',
    'https://www.linkedin.com/mwlite/in/vololoniaina-damia-tsiafaratiana-b0394318a',
  ]

  useEffect(() => {
    /*const usernames: string[] = [
      'Ntsoa2112',
      'RajaRakoto',
      'Damichou',
      'Gaetan1903',
      'rivo2302',
    ]*/
    const usernames: string[] = ['Ntsoa2112', 'Gaetan1903', 'Damichou']
    const promises: Promise<I_User>[] = usernames.map((username) =>
      fetch(`https://api.github.com/users/${username}`).then((response) =>
        response.json(),
      ),
    )
    Promise.all(promises)
      .then((data: I_User[]) => {
        const profilePics: string[] = data.map((user) => user.avatar_url)
        setGithubProfilePics(profilePics)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <React.Fragment>
      <div
        style={{
          marginTop: 100,
        }}
      >
        <hr />
        <div className={styles.typingFixOnMobile}>
          <Typing
            user="root"
            host="hiu"
            lists={['echo $Contributeurs']}
            root={true}
          />
        </div>
        <div className={styles.contrib}>
          {githubProfilePics.map((profilePic, index) => (
            <Link
              href={linkLinkedin[index]}
              target="_blank"
              className={styles.profil}
              key={index}
              rel="noreferrer"
            >
              <img src={profilePic} alt={`GitHub Profile ${index}`} />
              <h3>{realNames[index]}</h3>
              <div className={styles.states}>
                <Stats
                  id={contribStats[index].id}
                  frontend={contribStats[index].frontend}
                  backend={contribStats[index].backend}
                  bot={contribStats[index].bot}
                  fonctionnel={contribStats[index].fonctionnel}
                  cm={contribStats[index].cm}
                  devops={contribStats[index].devops}
                  integrationAPI={contribStats[index].integrationAPI}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
