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
    maxWidth: '300px',
    marginTop: 45,
  },
}));

type params = {
  name: string;
  logoSrc: string;
  votes: number;
  against: number;
  voters: string[];
};

export default function ParticipantCard({
  name,
  logoSrc,
  votes,
  against,
  voters,
}: params) {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.paper}>
      <Card>
        <CardMedia
          component="img"
          height="130px"
          image={logoSrc}
          style={{ objectFit: 'scale-down', maxWidth: '300' }}
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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {votes}% votes
            </Typography>
            <AvatarGroup max={3}>
              {voters.map(
                (
                  voter: string | undefined,
                  index: number | null | undefined
                ) => (
                  <Avatar key={index} src={voter} alt={voter} />
                )
              )}
            </AvatarGroup>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" color="error">
              {against} votes against
            </Typography>
            <AvatarGroup max={3}>
              {voters.map(
                (
                  voter: string | undefined,
                  index: number | null | undefined
                ) => (
                  <Avatar key={index} src={voter} alt={voter} />
                )
              )}
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
