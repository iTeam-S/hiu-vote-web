import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, Tooltip, Box, Typography, List } from '@mui/material'
import { ParticipantType, ParticipantVotesComments, ParticipantVotesCommentsList } from '../type'
import { Avatar, AvatarGroup, CardMedia } from '@mui/material'
import { AiFillHeart } from 'react-icons/ai'
import { GiStrong } from 'react-icons/gi'
import styles from './detailsParticipant.module.css'
import { getParticipantVotesCommentsList } from '../query/participantVotesComments'
import { StyledEngineProvider } from '@mui/material/styles'
import SwipeableEdgeDrawer from '../drawer/drawer'

type Props = {
  handleCloseDialog: () => void
  open: boolean
  participantsDetails: ParticipantType
  nbrVoters: number
}

type PropsComment = {
  avatarSrc: string, 
  nom: string,
  commentaire: string,
}

const DialogDetails = ({
  handleCloseDialog,
  open,
  participantsDetails,
}: Props) => {
  const [openDrawerAlainay, setOpenDrawerAlainay] = useState(false)
  const [openDrawerZakanay, setOpenDrawerZakanay] = useState(false)

  const [pageAlainay, setPageAlainay] = useState<number>(1);
  const [pageZakanay, setPageZakanay] = useState<number>(1);

  const [participantVotesComments, setParticipantVotesComments] =
    useState<ParticipantVotesComments[] | null>(null)
  const [participantContreVotesComments, setParticipantContreVotesComments] =
    useState<ParticipantVotesComments[] | null>(null)
  
  const logoSrc =
    participantsDetails.collectionId +
    '/' +
    participantsDetails.id +
    '/' +
    participantsDetails.logo;
  const votesAlainay = participantsDetails.expand.participant_pourcent;

  const toggleDrawerAlainay = (newOpenDrawer: boolean) => () => {
    setOpenDrawerAlainay(newOpenDrawer)
  }
  const toggleDrawerZakanay = (newOpenDrawer: boolean) => () => {
    setOpenDrawerZakanay(newOpenDrawer)
  }

  const fetchVotesComments = async () => {
    const newtVotesComments = await getParticipantVotesCommentsList({
      page: pageAlainay,
      perPage: 5,
      idParticipant: participantsDetails.id,
      collection: 'votes',
    })
    if(participantVotesComments) {
      setParticipantVotesComments([...participantVotesComments, ...newtVotesComments.items])
    } else {
      setParticipantVotesComments(newtVotesComments.items)
    }
    setPageAlainay(pageAlainay + 1);
  }

  const fetchContreVotesComments = async () => {
    const newContreVotesComments =
      await getParticipantVotesCommentsList({
        page: pageZakanay,
        perPage: 5,
        idParticipant: participantsDetails.id,
        collection: 'contre_votes',
      })
    if(participantContreVotesComments ) {
      setParticipantContreVotesComments([...participantContreVotesComments, ...newContreVotesComments.items])
    } else {
      setParticipantContreVotesComments(newContreVotesComments.items)
    }
    setPageZakanay(prevPage => prevPage + 1);
  }

  const handleScrollAlainay = async(event :any) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if(bottom) {
      fetchVotesComments();
    }
  };
  const handleScrollZakanay = async(event :any) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
    if(bottom) {
      fetchContreVotesComments();
    }
  };

  useEffect(() => {
    fetchVotesComments();
    fetchContreVotesComments();
  }, [participantsDetails])
  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth>
      <div className={styles.modal}>
        <div className={styles.logo}>
          <CardMedia
            component="img"
            height="100px"
            image={process.env.API_URL + 'files/' + logoSrc}
            style={{
              margin: 'auto',
              marginTop: 20,
              marginBottom: 20,
              borderRadius: '20px',
              width: '45%',
              height: 'auto',
            }}
          />
        </div>
        <hr />
        <h1 className={styles.name}>{participantsDetails.univ_name}</h1>
        <hr />
        <h2 className={styles.fullname}>
          {participantsDetails.full_univ_name}
        </h2>
        <p className={styles.city}>{participantsDetails.city}</p>
        <p className={styles.description}>{participantsDetails.description}</p>
        <div className={styles.alainay}>
          <span>
            <AiFillHeart size={50} /> &nbsp; Alainay
          </span>
          <h2>{votesAlainay}</h2>
          <hr />
          <div className={styles.avatar}>
            <div>
              <button onClick={toggleDrawerAlainay(!openDrawerAlainay)}>
                Voir plus (Alainay) ...
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.zakanay}>
          <span>
            <GiStrong size={50} /> &nbsp; Zakanay
          </span>
          <hr style={{ marginTop: 10 }} />

          <div className={styles.avatar}>
            <div>
              <button onClick={toggleDrawerZakanay(!openDrawerZakanay)}>
                Voir plus (Zakanay) ...
              </button>
            </div>
          </div>
        </div>
        <DialogActions>
          <Button style={{ color: 'teal' }} onClick={handleCloseDialog}>
            Fermer
          </Button>
        </DialogActions>
        <StyledEngineProvider injectFirst>
            <SwipeableEdgeDrawer
              title="Alainay"
              openDrawer={openDrawerAlainay}
              toggleDrawer={toggleDrawerAlainay}
              handleScroll={handleScrollAlainay}
            >
              {participantVotesComments &&
                participantVotesComments.map((voteComment, index) => (
                    <Comment
                      key={index}
                      avatarSrc={voteComment.expand.voter.profil_pic}
                      nom={voteComment.expand.voter.name}
                      commentaire={voteComment.comment}
                    />
                ))}
            </SwipeableEdgeDrawer>
            
          <div>
            <SwipeableEdgeDrawer
              title="Zakanay"
              openDrawer={openDrawerZakanay}
              toggleDrawer={toggleDrawerZakanay}
              handleScroll={handleScrollZakanay}
            >
              {participantContreVotesComments &&
              participantContreVotesComments.map((voteComment, index) => (
                <Comment
                  key={index}
                  avatarSrc={voteComment.expand.voter.profil_pic}
                  nom={voteComment.expand.voter.name}
                  commentaire={voteComment.comment}
                />
              ))}
            </SwipeableEdgeDrawer>
          </div>
        </StyledEngineProvider>
      </div>
    </Dialog>
  )
}

const Comment = ({ avatarSrc, nom, commentaire }: PropsComment) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={avatarSrc} />
      <Box ml={2}>
        <Typography variant="subtitle1">{nom}</Typography>
        <Typography variant="body1">{commentaire}</Typography>
      </Box>
    </Box>
  );
};

export default DialogDetails
