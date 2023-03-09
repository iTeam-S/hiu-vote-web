import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface Voter {
  name: string;
  avatar: string;
}

interface VotePageProps {
  username: string;
  fullName: string;
  logo: string;
  city: string;
  description: string;
  upvotes: Voter[];
  downvotes: Voter[];
}

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

const VotePage: React.FC<VotePageProps> = ({
  username,
  fullName,
  logo,
  city,
  description,
  upvotes,
  downvotes,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="h1">
              {username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {fullName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {city}
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </CardContent>
          <CardMedia component="img" image={logo} alt={fullName} />
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" component="h2">
          Votes
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Pour :
        </Typography>
        <Grid container spacing={2}>
          {upvotes.map((voter, index) => (
            <Grid item key={`upvote-${index}`}>
              <Avatar alt={voter.name} src={voter.avatar} />
              <Typography variant="caption">{voter.name}</Typography>
            </Grid>
          ))}
        </Grid>
        <Typography variant="subtitle1" color="text.secondary">
          Contre :
        </Typography>
        <Grid container spacing={2}>
          {downvotes.map((voter, index) => (
            <Grid item key={`downvote-${index}`}>
              <Avatar alt={voter.name} src={voter.avatar} />
              <Typography variant="caption">{voter.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VotePage;