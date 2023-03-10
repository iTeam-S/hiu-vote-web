import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { ParticipantsVotes } from '../type'
import { Avatar, AvatarGroup, CardContent, CardMedia } from '@mui/material'
import { AiFillHeart } from 'react-icons/ai'
import { GiStrong } from 'react-icons/gi'
import styles from './detailsParticipant.module.css'

type Props = {
  handleCloseDialog: () => void
  open: boolean
  participantsDetails: ParticipantsVotes
  nbrVoters: number
}

const DialogDetails = ({
  handleCloseDialog,
  open,
  participantsDetails,
  nbrVoters,
}: Props) => {
  const logoSrc =
    participantsDetails.collectionId +
    '/' +
    participantsDetails.id +
    '/' +
    participantsDetails.logo
  const votesAlainay =
    participantsDetails.expand &&
    participantsDetails.expand['votes(participant)']
      ? (
          (participantsDetails.expand['votes(participant)'].length /
            nbrVoters) *
          100
        )
          .toFixed(2)
          .toString()
      : '0'
  const voters =
    participantsDetails.expand &&
    participantsDetails.expand['votes(participant)']
      ? participantsDetails.expand['votes(participant)']
      : null
  const votersZakanay =
    participantsDetails.expand &&
    participantsDetails.expand['contre_votes(participant)']
      ? participantsDetails.expand['contre_votes(participant)']
      : null
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
          ({participantsDetails.full_univ_name})
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
            <AvatarGroup>
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
        <hr />
        <div className={styles.zakanay}>
          <span>
            <GiStrong size={50} /> &nbsp; Zakanay
          </span>
          <hr style={{ marginTop: 10 }} />
          <div className={styles.avatar}>
            <AvatarGroup>
              {votersZakanay &&
                votersZakanay.map((element, index) => (
                  <Avatar
                    key={index}
                    src={element.expand.voter.profil_pic}
                    alt={element.expand.voter.name}
                  />
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
