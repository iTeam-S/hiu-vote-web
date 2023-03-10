import { Grid, Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ItemVoter } from '../type'
import { useRef } from 'react'
import styles from '../../styles/Home.module.css'

const UserCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const UserAvatar = styled('img')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginBottom: '8px',
})

const UserName = styled(Typography)({
  textAlign: 'center',
  fontFamily:
    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono, Courier New, monospace',
})

interface Props {
  items: ItemVoter[]
}

const VotersList = ({ items }: Props) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {items.map((voter) => (
        <Grid key={voter.id} item xs={12} sm={6} md={4} lg={2}>
          <UserCard>
            <UserAvatar src={voter.profil_pic} alt={voter.name} />
            <UserName color="text.secondary" variant="subtitle1">
              {voter.name}
            </UserName>
          </UserCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default function Voters({ items }: Props) {
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <div
      style={{
        marginTop: 120,
      }}
    >
      <Box sx={{ mt: 4 }} ref={listRef}>
        <div className={styles.voterstext}>Voters</div>
        <div
          id="voters-link"
          style={{
            backgroundColor: '#f5f5f571',
            padding: 20,
            margin: 50,
            borderRadius: '20px',
          }}
        >
          <VotersList items={items} />
        </div>
      </Box>
    </div>
  )
}
