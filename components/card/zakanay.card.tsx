import React from 'react'

/* mui */
import { Avatar, AvatarGroup, Tooltip, Badge } from '@mui/material'

/* types */
import { T_ZakanayCard } from '../../types'

/* icons */
import { GiStrong } from 'react-icons/gi'

/* styles */
import styles from '../participant/participant.module.css'

// ===========================================================

export default function ZakanayCard({
  contreVotesCount,
  againstVoters,
}: T_ZakanayCard) {
  const contreVoteCountCalculate =
    contreVotesCount > 3 ? `+${contreVotesCount - 3}` : contreVotesCount

  const badgeStyle = {
    '& .MuiBadge-badge': {
      backgroundColor: '#fafafa',
    },
  }

  return (
    <React.Fragment>
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
              <Badge badgeContent={contreVoteCountCalculate} sx={badgeStyle}>
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
    </React.Fragment>
  )
}
