import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { VotesParticipant } from '../type';

const useStyles = makeStyles(() => ({
  logo: {
    marginRight: 11,
    maxWidth: 100,
    maxHeight: 100,
  },
  avatar: {
    width: 3,
    height: 3,
    marginRight: 5,
  },
  badge: {
    top: '50%',
    right: -10,
    transform: 'translateY(-50%)',
  },
  paper: {
    marginTop: 45,
  },
  votes: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: '280px',
    height: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));

type params = {
  name: string;
  logoSrc: string;
  votes: number;
  against: number;
  voters: VotesParticipant[] | null;
  againstVoters: VotesParticipant[] | null;
};

export default function ParticipantCard({
  name,
  logoSrc,
  votes,
  against,
  voters,
  againstVoters,
}: params) {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.paper}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          height="100px"
          image={process.env.API_IMG + logoSrc}
          style={{ objectFit: 'scale-down', width: '300' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="text.secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {name}
          </Typography>

          <div className={classes.votes}>
            <Typography variant="body1" color="text.secondary">
              {votes} alainay
            </Typography>
            <AvatarGroup max={3}>
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

          <div className={classes.votes}>
            <Typography variant="body2" color="error">
              {against} zakanay
            </Typography>
            <AvatarGroup max={3}>
              {againstVoters &&
                againstVoters.map((element, index) => (
                  <Avatar
                    key={index}
                    src={element.expand.voter.profil_pic}
                    alt={element.expand.voter.name}
                  />
                ))}
            </AvatarGroup>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<VisibilityIcon />}
          >
            Détails
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}
