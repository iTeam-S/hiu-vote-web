import React, { useEffect, useState } from 'react'

/* icons */
import { FaRegEye } from 'react-icons/fa'

/* components */
import AlainayCard from './alainay.card'
import ZakanayCard from './zakanay.card'

/* types */
import {
  I_VotesParticipant,
  T_ParticipantCard,
  T_DetailsButton,
} from '../../types'

/* styles */
import styles from '../participant/participant.module.css'

// ===========================================================

function DetailsButton({ id, handleClickDetails }: T_DetailsButton) {
  const [onHover, setOnHover] = useState(false)
  const changerEtatSurvole = () => {
    setOnHover(!onHover)
  }

  return (
    <React.Fragment>
      <button
        className={styles.secondary_btn}
        role="button"
        onMouseEnter={changerEtatSurvole}
        onMouseLeave={changerEtatSurvole}
        onClick={() => handleClickDetails(id)}
      >
        {onHover ? 'Details' : <FaRegEye />}
      </button>
    </React.Fragment>
  )
}

export default function ParticipantCard({
  id,
  name,
  logoSrc,
  votesPourcentage,
  votesCount,
  contreVotesCount,
  voters,
  againstVoters,
  handleClickDetails,
}: T_ParticipantCard) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [listComments, setListComments] = useState<I_VotesParticipant[] | null>(
    null,
  )

  useEffect(() => {
    const comments = voters
      ? voters.filter(
          (element) => element.comment.length > 2 && element.comment !== '...',
        )
      : null
    setListComments(comments)
    const intervalId = setInterval(() => {
      if (listComments?.length) {
        const nextIndex = (currentIndex + 1) % listComments.length
        setCurrentIndex(nextIndex)
      }
    }, 3300)

    return () => clearInterval(intervalId)
  }, [currentIndex, voters])

  return (
    <React.Fragment>
      <div className={styles.card}>
        <div className="row">
          <div className={styles.logo}>
            <img src={process.env.API_URL + 'files/' + logoSrc} alt="logo" />
          </div>
          <div className={styles.content}>
            <hr />
            <h3 className={styles.title}>{name}</h3>
            <hr />
            <AlainayCard
              votesPourcentage={votesPourcentage}
              votesCount={votesCount}
              voters={voters}
            />
            <ZakanayCard
              contreVotesCount={contreVotesCount}
              againstVoters={againstVoters}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <DetailsButton handleClickDetails={handleClickDetails} id={id} />
        </div>
      </div>
    </React.Fragment>
  )
}
