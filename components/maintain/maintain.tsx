import React from 'react'

/* libs */
import UnderConstruction from 'react-under-construction'

/* styles */
import 'react-under-construction/build/css/index.css'

// ===========================================================

export default function Maintain() {
  return (
    <UnderConstruction
      logo={{
        src: 'https://iteam-s.mg/assets/img/LOGO.png',
        alt: 'iteam-s logo',
      }}
      title={{
        text: 'ITeam-$',
      }}
      description={{
        text: 'Notre site internet est en construction. Nous serons bientôt là, abonnez-vous pour être informé',
        style: {
          maxWidth: '440px',
        },
      }}
      subscribe={{
        placeholder: 'E-mail',
        buttonText: "S'abonner",
        onSubmit: (value: string) => {
          console.log('user typed email :', value)
        },
      }}
      links={
        [
          // {
          //   url: 'https://web.facebook.com/iTeam.Community',
          //   image: '/public/facebook.svg',
          // },
          // {
          //   url: 'https://www.linkedin.com/',
          //   image: '../../public/linkedin.svg',
          // },
        ]
      }
    />
  )
}
