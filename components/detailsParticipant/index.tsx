<<<<<<< HEAD
import React from 'react'
import { Button, Dialog, DialogActions, Tooltip } from '@mui/material'
import { ParticipantsVotes } from '../type'
import { Avatar, AvatarGroup, CardMedia } from '@mui/material'
=======
import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  Tooltip
} from '@mui/material'
import { ParticipantType, ParticipantVotesCommentsList } from '../type'
import { Avatar, AvatarGroup, CardContent, CardMedia } from '@mui/material'
>>>>>>> origin/opti
import { AiFillHeart } from 'react-icons/ai'
import { GiStrong } from 'react-icons/gi'
import styles from './detailsParticipant.module.css'
import { getParticipantVotesCommentsList } from '../query/participantVotesComments'

type Props = {
  handleCloseDialog: () => void,
  open: boolean,
  participantsDetails: ParticipantType,
  nbrVoters: number,
}

const DialogDetails = ({
  handleCloseDialog,
  open,
  participantsDetails,
  nbrVoters,
}: Props) => {
  const [participantVotesComments, setParticipantVotesComments] = useState<
    ParticipantVotesCommentsList | null>(null);
  const [participantContreVotesComments, setParticipantContreVotesComments] = useState<
    ParticipantVotesCommentsList | null>(null);
  const fetchVotesComments = async() => {
    const participantVotesComments = await getParticipantVotesCommentsList(
      {page:1, perPage: 5, idParticipant: participantsDetails.id, collection: 'votes'});
    setParticipantVotesComments(participantVotesComments);
    const participantContreVotesComments = await getParticipantVotesCommentsList(
      {page:1, perPage: 5, idParticipant: participantsDetails.id, collection: 'contre_votes'});
    setParticipantContreVotesComments(participantContreVotesComments);
  }
  useEffect(() => {
    fetchVotesComments();
  }, [participantsDetails])
  
  const logoSrc =
    participantsDetails.collectionId +
    '/' +
    participantsDetails.id +
    '/' +
    participantsDetails.logo
  const votesAlainay = participantsDetails.expand.participant_pourcent;
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
          <h2>{votesAlainay}%</h2>
          <hr />
          <div className={styles.avatar}>
<<<<<<< HEAD
            <AvatarGroup>
              {voters &&
                voters.map((element, index) => (
                  <Tooltip
                    title={element.expand.voter.name}
                    placement="top"
                    arrow
                  >
=======
            <AvatarGroup max={99}>
              {participantVotesComments &&
                participantVotesComments.items.map((element, index) => (
                  <Tooltip title={element.expand.voter.name} placement='top' arrow>
>>>>>>> origin/opti
                    <Avatar
                      key={index}
                      src={element.expand.voter.profil_pic}
                      alt={element.expand.voter.name}
                    />
                  </Tooltip>
                ))}
            </AvatarGroup>
          </div>
        </div>
        <hr />
        <div className={styles.zakanay}>
          <span>
            <GiStrong size={50} /> &nbsp; Zakanay
          </span>
          <hr style={{ marginTop: 10 }} />
          <div className={styles.avatar}>
            <AvatarGroup>
<<<<<<< HEAD
              {votersZakanay &&
                votersZakanay.map((element, index) => (
                  <Tooltip
                    title={element.expand.voter.name}
                    placement="top"
                    arrow
                  >
=======
              {participantContreVotesComments &&
                participantContreVotesComments.items.map((element, index) => (
                  <Tooltip title={element.expand.voter.name} placement='top' arrow>
>>>>>>> origin/opti
                    <Avatar
                      key={index}
                      src={element.expand.voter.profil_pic}
                      alt={element.expand.voter.name}
                    />
                  </Tooltip>
                ))}
            </AvatarGroup>
          </div>
        </div>
        <DialogActions>
          <Button style={{ color: 'teal' }} onClick={handleCloseDialog}>
            Fermer
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default DialogDetails
