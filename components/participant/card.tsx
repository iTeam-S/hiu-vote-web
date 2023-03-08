import { Avatar, AvatarGroup, CardContent, CardMedia } from '@mui/material'
import { VotesParticipant } from '../type'
import styles from './card.module.css'

type params = {
  name: string
  logoSrc: string
  votes: string
  voters: VotesParticipant[] | null
  againstVoters: VotesParticipant[] | null
}

export default function ParticipantCard({
  name,
  logoSrc,
  votes,
  voters,
  againstVoters,
}: params) {
  // const classes = useStyles();

  return (
    <div className={styles.card}>
      <CardMedia
        component="img"
        height="120px"
        image={process.env.API_IMG + logoSrc}
        className={styles.cardMedia}
      />

      <CardContent>
        <hr />
        <h3 className={styles.title}>{name}</h3>
        <hr />
        <div className={styles.alainay}>
          <div>
            <h2>{votes}%</h2>
            <span>Alainay</span>
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
          <AvatarGroup max={4}>
            {againstVoters &&
              againstVoters.map((element, index) => (
                <Avatar
                  key={index}
                  src={element.expand.voter.profil_pic}
                  alt={element.expand.voter.name}
                />
              ))}
          </AvatarGroup>
          <div>
            <h2>0 %</h2>
            <span>Zakanay</span>
          </div>
        </div>
      </CardContent>

      <button className={styles.secondary_btn} role="button">
        Details
      </button>
    </div>
  )
}
