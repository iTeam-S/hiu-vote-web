import { Avatar, AvatarGroup, CardContent, CardMedia } from '@mui/material'
import { VotesParticipant } from '../type'
import styles from './card.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegEye } from 'react-icons/fa'
import { GiStrong } from 'react-icons/gi'
import { useState } from 'react'

type params = {
  id: string,
  name: string
  logoSrc: string
  votes: string
  voters: VotesParticipant[] | null
  againstVoters: VotesParticipant[] | null,
  handleClickDetails: (id: string) => void;
}

type paramsButton = {
  id: string,
  handleClickDetails: (id: string) => void;
}

const DetailsButton = ({id, handleClickDetails}: paramsButton) => {
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
      onClick={() => handleClickDetails(id)}
    >
      {onHover ? 'Details' : <FaRegEye />}
    </button>
  )
}

export default function ParticipantCard({
  id,
  name,
  logoSrc,
  votes,
  voters,
  againstVoters,
  handleClickDetails
}: params) {
  // const classes = useStyles();

  return (
    <div className={styles.card}>
      <CardMedia
        component="img"
        height="120px"
        image={process.env.API_URL + 'files/'+logoSrc}
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
          <AvatarGroup max={3}>
            {againstVoters &&
              againstVoters.map((element, index) => (
                <Avatar
                  key={index}
                  src={element.expand.voter.profil_pic}
                  alt={element.expand.voter.name}
                />
              ))}
          </AvatarGroup>

            <span>
              <GiStrong size={25} /> &nbsp; Zakanay
            </span>
        </div>
      </CardContent>
      <DetailsButton handleClickDetails={handleClickDetails} id={id}/>
    </div>
  )
}
