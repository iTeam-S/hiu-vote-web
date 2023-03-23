import React, { useState, useEffect } from 'react'

/* next */
import Link from 'next/link'

/* components */
import Typing from '../typing/typing'

/* types */
import { I_User } from '../../types'

/* styles */
import styles from './contrib.module.css'

// ===========================================================

export default function Contrib() {
  const [githubProfilePics, setGithubProfilePics] = useState<string[]>([])
  const realNames: string[] = ['Ntsoa', 'Raja', 'Damia', 'Gaetan', 'Rivo']

  const linkLinkedin: string[] = [
    'https://www.linkedin.com/in/ntsoa/',
    'https://portfolio-raja.netlify.app/',
    'https://www.linkedin.com/mwlite/in/vololoniaina-damia-tsiafaratiana-b0394318a',
    'https://www.linkedin.com/in/gaetanj/',
    'https://www.linkedin.com/in/rajaonarivony/',
  ]

  useEffect(() => {
    const usernames: string[] = [
      'Ntsoa2112',
      'RajaRakoto',
      'Damichou',
      'Gaetan1903',
      'rivo2302',
    ]
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
        <div id="contrib-link" className={styles.contrib}>
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
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
