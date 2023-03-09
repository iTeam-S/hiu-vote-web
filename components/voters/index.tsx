<<<<<<< HEAD
import { Grid, Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ItemVoter } from '../type'
import { useRef } from 'react'
=======
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ItemVoter } from '../type';
import { useRef } from 'react';
>>>>>>> origin/main

const UserCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
<<<<<<< HEAD
})
=======
});
>>>>>>> origin/main

const UserAvatar = styled('img')({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginBottom: '8px',
<<<<<<< HEAD
})
=======
});
>>>>>>> origin/main

const UserName = styled(Typography)({
  textAlign: 'center',
  fontFamily:
<<<<<<< HEAD
    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono, Courier New, monospace',
})

interface Props {
  items: ItemVoter[]
}

const VotersList = ({ items }: Props) => {
=======
      'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono, Courier New, monospace',
});

interface Props {
  items: ItemVoter[];
}

const VotersList = ({items}: Props) => {
>>>>>>> origin/main
  return (
    <Grid container spacing={2} justifyContent="center">
      {items.map((voter) => (
        <Grid key={voter.id} item xs={12} sm={6} md={4} lg={2}>
          <UserCard>
            <UserAvatar src={voter.profil_pic} alt={voter.name} />
<<<<<<< HEAD
            <UserName color="text.secondary" variant="subtitle1">
              {voter.name}
            </UserName>
=======
            <UserName color="text.secondary" variant="subtitle1">{voter.name}</UserName>
>>>>>>> origin/main
          </UserCard>
        </Grid>
      ))}
    </Grid>
<<<<<<< HEAD
  )
}

export default function Voters({ items }: Props) {
  const listRef = useRef<HTMLDivElement>(null)

  return (
    <Box sx={{ mt: 4 }} ref={listRef}>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Voters
      </Typography>
      <VotersList items={items} />
    </Box>
  )
}
=======
  );
};

export default function Voters({items}: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ mt: 4 }} ref={listRef}>
      <Typography variant="h5" align="center" color="text.secondary" gutterBottom>
        Voters
      </Typography>
      <VotersList items={items}/>
    </Box>
  );
}
>>>>>>> origin/main
