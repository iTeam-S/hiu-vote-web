import React, { useState, useEffect } from 'react'

interface IUser {
  login: string
  avatar_url: string
}

export default function Contrib() {
  const [githubProfilePics, setGithubProfilePics] = useState<string[]>([])

  useEffect(() => {
    const usernames: string[] = [
      'RajaRakoto',
      'RajaRakoto',
      'RajaRakoto',
      'RajaRakoto',
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
    <div>
      {githubProfilePics.map((profilePic, index) => (
        <img src={profilePic} alt={`GitHub Profile ${index}`} key={index} />
      ))}
    </div>
  )
}
