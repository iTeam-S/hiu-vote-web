import React, { useState, useEffect } from 'react'
import styles from './contrib.module.css'

interface IUser {
  login: string
  avatar_url: string
}

export default function Contrib() {
  const [githubProfilePics, setGithubProfilePics] = useState<string[]>([])
  const realNames: string[] = [
    'Manambintsoa',
    'Gaetan',
    'Damia',
    'Raja',
    'Rivo',
  ]

  useEffect(() => {
    const usernames: string[] = [
      'Ntsoa2112',
      'Gaetan1903',
      'Damichou',
      'RajaRakoto',
      'rivo2302',
    ]
    const promises: Promise<IUser>[] = usernames.map((username) =>
      fetch(`https://api.github.com/users/${username}`).then((response) =>
        response.json(),
      ),
    )
    Promise.all(promises)
      .then((data: IUser[]) => {
        const profilePics: string[] = data.map((user) => user.avatar_url)
        setGithubProfilePics(profilePics)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div
      style={{
        marginTop: 100,
      }}
    >
      <hr />
      <h2
        style={{
          textAlign: 'center',
          fontSize: 32,
          color: '#eee',
        }}
      >
        Contributeurs
      </h2>
      <div id="contrib-link" className={styles.contrib}>
        {githubProfilePics.map((profilePic, index) => (
          <div className={styles.profil} key={index}>
            <img src={profilePic} alt={`GitHub Profile ${index}`} />
            <h3>{realNames[index]}</h3>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}
