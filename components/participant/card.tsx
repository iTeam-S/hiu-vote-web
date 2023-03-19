import { Avatar, AvatarGroup, Tooltip, Badge } from '@mui/material'
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
  const voteCountCalculate = votesCount > 3 ? `+${votesCount - 3}` : votesCount
  const contreVoteCountCalculate =
    contreVotesCount > 3 ? `+${contreVotesCount - 3}` : contreVotesCount
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [listComments, setListComments] = useState<VotesParticipant[] | null>(
    null,
  )
  const badgeStyle = {
    '& .MuiBadge-badge': {
      backgroundColor: '#fafafa',
    },
  }

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
    }, 2000)

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
              <div className="col-6 d-flex align-items-center justify-content-center">
                <div>
                  <h2 style={{ textAlign: 'center' }}>{votesPourcentage}%</h2>
                  <span>
                    <AiFillHeart size={25} /> &nbsp; Alainay
                  </span>
                </div>
              </div>
              <div
                className="col-6 d-flex align-items-center justify-content-end"
                style={{ margin: 'auto' }}
              >
                {voters ? (
                  <Badge badgeContent={voteCountCalculate} sx={badgeStyle}>
                    <AvatarGroup max={3}>
                      {voters &&
                        voters.map((element) => (
                          <Tooltip
                            title={element.expand.voter.name}
                            placement="top"
                            arrow
                            key={element.id}
                          >
                            <Avatar
                              src={element.expand.voter.profil_pic}
                              alt={element.expand.voter.name}
                            />
                          </Tooltip>
                        ))}
                    </AvatarGroup>
                  </Badge>
                ) : (
                  <Badge badgeContent={voteCountCalculate} color="primary">
                    <Avatar></Avatar>
                  </Badge>
                )}
              </div>
              {listComments && listComments[currentIndex] && (
                <div className={styles.comments}>
                  <p style={{ color: '#444242', fontWeight: 'bolder' }}>
                    {listComments[currentIndex].expand.voter.name}
                  </p>
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
              <div className="col-6 d-flex align-items-center justify-content-center">
                <div>
                  <h2 style={{ textAlign: 'center' }}>{contreVotesCount}</h2>
                  <span>
                    <GiStrong size={25} /> &nbsp; Zakanay
                  </span>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                {againstVoters ? (
                  <Badge
                    badgeContent={contreVoteCountCalculate}
                    sx={badgeStyle}
                  >
                    <AvatarGroup max={3}>
                      {againstVoters.map((element) => (
                        <Tooltip
                          title={element.expand.voter.name}
                          placement="top"
                          arrow
                          key={element.id}
                        >
                          <Avatar
                            src={element.expand.voter.profil_pic}
                            alt={element.expand.voter.name}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Badge>
                ) : (
                  <Badge badgeContent={contreVotesCount} color="primary">
                    <Avatar></Avatar>
                  </Badge>
                )}
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
