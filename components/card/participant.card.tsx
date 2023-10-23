import React, { useEffect, useState } from 'react'

/* icons */
import { FaRegEye } from 'react-icons/fa'

/* components */
import TakeCard from './take.card'
import AffordCard from './afford.card'

/* types */
import { T_ParticipantCard, T_DetailsButton, T_CommentOpt } from '../../types'

/* styles */
import styles from '../participant/participant.module.css'
import { getThreeVotes } from '../../apis/comments-three-voters'

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
  handleClickDetails,
}: T_ParticipantCard) {
  const [voters, setVoters] = useState<null | T_CommentOpt[]>(null)
  const [againstVoters, setAgainstVoters] = useState<null | T_CommentOpt[]>(
    null,
  )

  const handleVotes = async () => {
    const votes = await getThreeVotes({
      idParticipant: id,
      collection: 'votes',
    })
    setVoters(votes)
  }
  const handleContreVotes = async () => {
    const votes = await getThreeVotes({
      idParticipant: id,
      collection: 'contre_votes',
    })
    setAgainstVoters(votes)
  }

  useEffect(() => {
    handleVotes()
  }, [votesCount])

  useEffect(() => {
    handleContreVotes()
  }, [contreVotesCount])

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
            <TakeCard
              votesPourcentage={votesPourcentage}
              votesCount={votesCount}
              voters={voters}
            />
            <AffordCard
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
