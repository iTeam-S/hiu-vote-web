import { Avatar, AvatarGroup, Tooltip, Badge } from '@mui/material'
import { VotesParticipant } from '../../types'
import styles from '../participant/card.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'

type params = {
  votesPourcentage: string
  votesCount: number
  voters?: VotesParticipant[] | null
}

export default function AlainayCard({
  votesPourcentage,
  votesCount,
  voters,
}: params) {
  const voteCountCalculate = votesCount > 3 ? `+${votesCount - 3}` : votesCount
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
    }, 2500)

    return () => clearInterval(intervalId)
  }, [currentIndex, voters])

  function commentLimiter(max: number, comment: string): string {
    const words = comment.split(' ')
    if (words.length <= max) {
      return comment
    } else {
      const result = words.slice(0, max).join(' ')
      return `${result} ...`
    }
  }

  return (
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
            <p style={{ color: '#2c2b2b', fontWeight: 'bolder' }}>
              {listComments[currentIndex].expand.voter.name}
            </p>
            <div className={styles.core}>
              <FaQuoteLeft color="#444" />
              &nbsp;
              {commentLimiter(10, listComments[currentIndex].comment)}
              &nbsp;
              <FaQuoteRight color="#444" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
