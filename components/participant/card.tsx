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

type params = {
  name: string;
  logoSrc: string;
  votes: string;
  voters: VotesParticipant[] | null;
  againstVoters: VotesParticipant[] | null;
};

export default function ParticipantCard({
  name,
  logoSrc,
  votes,
  voters,
  againstVoters,
}: params) {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.paper}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          height="120px"
          image={process.env.API_IMG + logoSrc}
          className={classes.cardMedia}
        />
        <CardContent>

          <h3>
            {name}
          </h3>

          <div className={classes.votes}>
            <Typography variant="body1" color="text.secondary">
              {votes}% alainay
            </Typography>
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

          <div className={classes.votes}>
            <Typography variant="body2" color="error">
              Zakanay
            </Typography>
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

const useStyles = makeStyles(() => ({
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
  cardMedia: {
    objectFit: 'scale-down',
    width: '300',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily:
      'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono, Courier New, monospace',
  },
}));
