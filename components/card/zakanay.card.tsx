import { Avatar, AvatarGroup, Tooltip, Badge } from '@mui/material'
import { VotesParticipant } from '../type'
import styles from '../participant/card.module.css'
import { GiStrong } from 'react-icons/gi'

type params = {
  contreVotesCount: number
  againstVoters?: VotesParticipant[] | null
}

export default function ZakanayCard({
  contreVotesCount,
  againstVoters,
}: params) {
  const contreVoteCountCalculate =
    contreVotesCount > 3 ? `+${contreVotesCount - 3}` : contreVotesCount

  const badgeStyle = {
    '& .MuiBadge-badge': {
      backgroundColor: '#fafafa',
    },
  }

  return (
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
  )
}
