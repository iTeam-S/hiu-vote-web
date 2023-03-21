import { VotesParticipant } from '../type'
import styles from './card.module.css'
import { FaRegEye } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import AlainayCard from '../card/alainay.card'
import ZakanayCard from '../card/zakanay.card'

type params = {
  id: string
  name: string
  logoSrc: string
  votesPourcentage: string
  votesCount: number
  contreVotesCount: number
  voters?: VotesParticipant[] | null
  againstVoters?: VotesParticipant[] | null
  handleClickDetails: (id: string) => void
}

type paramsButton = {
  id: string
  handleClickDetails: (id: string) => void
}

const DetailsButton = ({ id, handleClickDetails }: paramsButton) => {
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
  votesPourcentage,
  votesCount,
  contreVotesCount,
  voters,
  againstVoters,
  handleClickDetails,
}: params) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [listComments, setListComments] = useState<VotesParticipant[] | null>(
    null,
  )

  useEffect(() => {
    const comments = voters
      ? voters.filter((element) => element.comment.length > 2)
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
  )
}
