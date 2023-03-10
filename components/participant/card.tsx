import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import { VotesParticipant } from '../type'
import styles from './card.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegEye, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { GiStrong } from 'react-icons/gi'
import { useEffect, useState } from 'react'

type params = {
  id: string
  name: string
  logoSrc: string
  votes: string
  voters: VotesParticipant[] | null
  againstVoters: VotesParticipant[] | null
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
  votes,
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
      if (listComments) {
        const nextIndex = (currentIndex + 1) % listComments.length
        setCurrentIndex(nextIndex)
      }
    }, 4000)

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
          <div className={styles.alainay}>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6 d-flex align-items-center justify-content-center">
                <div>
                  <h2 style={{ textAlign: 'center' }}>{votes}%</h2>
                  <span>
                    <AiFillHeart size={25} /> &nbsp; Alainay
                  </span>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6 d-flex align-items-center justify-content-end">
                <AvatarGroup max={3}>
                  {voters &&
                    voters.map((element, index) => (
                      <Tooltip
                        title={element.expand.voter.name}
                        placement="top"
                        arrow
                      >
                        <Avatar
                          key={index}
                          src={element.expand.voter.profil_pic}
                          alt={element.expand.voter.name}
                        />
                      </Tooltip>
                    ))}
                </AvatarGroup>
              </div>
              {listComments && listComments[currentIndex] && (
                <div className={styles.comments}>
                  <div>
                    <Tooltip
                      title={listComments[currentIndex].expand.voter.name}
                      placement="top"
                      arrow
                    >
                      <Avatar
                        src={listComments[currentIndex].expand.voter.profil_pic}
                        alt={listComments[currentIndex].expand.voter.name}
                      />
                    </Tooltip>
                  </div>
                  <div className={styles.core}>
                    <FaQuoteLeft color="#444" />
                    &nbsp;
                    {listComments[currentIndex].comment}
                    &nbsp;
                    <FaQuoteRight color="#444" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.zakanay}>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6 d-flex align-items-center justify-content-center">
                <div>
                  <span>
                    <GiStrong size={25} /> &nbsp; Zakanay
                  </span>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6 d-flex align-items-center justify-content-end">
                <AvatarGroup max={3}>
                  {againstVoters &&
                    againstVoters.map((element, index) => (
                      <Tooltip
                        title={element.expand.voter.name}
                        placement="top"
                        arrow
                      >
                        <Avatar
                          key={index}
                          src={element.expand.voter.profil_pic}
                          alt={element.expand.voter.name}
                        />
                      </Tooltip>
                    ))}
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <DetailsButton handleClickDetails={handleClickDetails} id={id} />
      </div>
    </div>
  )
}
