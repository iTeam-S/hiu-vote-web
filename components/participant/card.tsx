import { Avatar, AvatarGroup, CardContent } from '@mui/material'
import { VotesParticipant } from '../type'
import styles from './card.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegEye } from 'react-icons/fa'
import { GiStrong } from 'react-icons/gi'
import { useState } from 'react'

type params = {
<<<<<<< HEAD
  id: string
=======
  id: string,
>>>>>>> origin/main
  name: string
  logoSrc: string
  votes: string
  voters: VotesParticipant[] | null
<<<<<<< HEAD
  againstVoters: VotesParticipant[] | null
  handleClickDetails: (id: string) => void
}

type paramsButton = {
  id: string
  handleClickDetails: (id: string) => void
}

const DetailsButton = ({ id, handleClickDetails }: paramsButton) => {
=======
  againstVoters: VotesParticipant[] | null,
  handleClickDetails: (id: string) => void;
}

type paramsButton = {
  id: string,
  handleClickDetails: (id: string) => void;
}

const DetailsButton = ({id, handleClickDetails}: paramsButton) => {
>>>>>>> origin/main
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
<<<<<<< HEAD
  handleClickDetails,
=======
  handleClickDetails
>>>>>>> origin/main
}: params) {
  return (
    <div className={styles.card}>
<<<<<<< HEAD
      <div className={styles.logo}>
        <img src={process.env.API_URL + 'files/' + logoSrc} alt="logo" />
      </div>
      <div className={styles.content}>
=======
      <CardMedia
        component="img"
        height="120px"
        image={process.env.API_URL + 'files/'+logoSrc}
        className={styles.cardMedia}
      />

      <CardContent>
>>>>>>> origin/main
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
            <div style={{ width: 75 }}>
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                }}
              >
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
        </div>
        <div className={styles.zakanay}>
<<<<<<< HEAD
          <div>
            <h2>0</h2>
            <span>
              <GiStrong size={25} /> &nbsp; Zakanay
            </span>
          </div>
          <div>
            <div style={{ width: 75 }}>
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
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <DetailsButton handleClickDetails={handleClickDetails} id={id} />
      </div>
=======
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
>>>>>>> origin/main
    </div>
  )
}
