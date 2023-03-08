import { Avatar, AvatarGroup, CardContent, CardMedia } from '@mui/material'
import { VotesParticipant } from '../type'
import styles from './card.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegEye } from 'react-icons/fa'
import { GiStrong } from 'react-icons/gi'
import { useState } from 'react'

type params = {
  name: string
  logoSrc: string
  votes: string
  voters: VotesParticipant[] | null
  againstVoters: VotesParticipant[] | null
}

const DetailsButton = () => {
  const [onHover, setOnHover] = useState(false)

  const changerEtatSurvole = () => {
    setOnHover(!onHover)
  }

  return (
    <button
      className={styles.secondary_btn}
      role="button"
      onMouseEnter={changerEtatSurvole}
      onMouseLeave={changerEtatSurvole}
    >
      {onHover ? 'Details' : <FaRegEye />}
    </button>
  )
}

export default function ParticipantCard({
  name,
  logoSrc,
  votes,
  voters,
  againstVoters,
}: params) {
  // const classes = useStyles();

  return (
    <div className={styles.card}>
      <CardMedia
        component="img"
        height="120px"
        image={process.env.API_IMG + logoSrc}
        className={styles.cardMedia}
      />

      <CardContent>
        <hr />
        <h3 className={styles.title}>{name}</h3>
        <hr />
        <div className={styles.alainay}>
          <div>
            <h2>{votes}%</h2>
            <span>
              <AiFillHeart size={25} /> &nbsp; Alainay
            </span>
          </div>
          <div>
            <AvatarGroup max={4}>
              {voters &&
                voters.map((element, index) => (
                  <Avatar
                    key={index}
                    src={element.expand.voter.profil_pic}
                    alt={element.expand.voter.name}
                  />
                ))}
            </AvatarGroup>
          </div>
        </div>
        <div className={styles.zakanay}>
          <AvatarGroup max={4}>
            {againstVoters &&
              againstVoters.map((element, index) => (
                <Avatar
                  key={index}
                  src={element.expand.voter.profil_pic}
                  alt={element.expand.voter.name}
                />
              ))}
          </AvatarGroup>
          <div>
            <h2>0 %</h2>
            <span>
              <GiStrong size={25} /> &nbsp; Zakanay
            </span>
          </div>
        </div>
      </CardContent>
      <DetailsButton />
    </div>
  )
}
