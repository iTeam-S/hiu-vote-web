import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ParticipantsVotes } from '../type';
import { Avatar, AvatarGroup, CardContent, CardMedia } from '@mui/material'
import styles from '../participant/card.module.css'
import { AiFillHeart } from 'react-icons/ai';
import { GiStrong } from 'react-icons/gi';

type Props = {
  handleCloseDialog: () => void;
  open: boolean;
  participantsDetails: ParticipantsVotes;
  nbrVoters: number
}

const DialogDetails = ({handleCloseDialog, open, participantsDetails, nbrVoters}: Props) => {
  const logoSrc = participantsDetails.collectionId + '/' + participantsDetails.id + '/' + participantsDetails.logo;
  const votesAlainay = participantsDetails.expand && participantsDetails.expand['votes(participant)']
    ? ((participantsDetails.expand['votes(participant)'].length / nbrVoters) * 100).toFixed(2).toString(): '0'
  const voters = participantsDetails.expand && participantsDetails.expand['votes(participant)']
    ? participantsDetails.expand['votes(participant)']: null;
  const votersZakanay= participantsDetails.expand && participantsDetails.expand['contre_votes(participant)']
    ? participantsDetails.expand['contre_votes(participant)'] : null
  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth>
      <CardMedia
        component="img"
        height="120px"
        image={process.env.API_URL + 'files/'+logoSrc}
        style={{
          margin: 'auto',
          borderRadius: '13%',
          width: '45%',
          height: 'auto',}}
      />
      <DialogTitle>{participantsDetails.univ_name}</DialogTitle>
      <p>{participantsDetails.full_univ_name}</p>
      <p>{participantsDetails.city}</p>
      <p>{participantsDetails.description}</p>
      <div className={styles.alainay}>
          <div>
            <h2>{votesAlainay}%</h2>
            <span>
              <AiFillHeart size={25} /> &nbsp; Alainay
            </span>
          </div>
          <div>
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
        <div className={styles.zakanay}>
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

            <span>
              <GiStrong size={25} /> &nbsp; Zakanay
            </span>
        </div>
      <DialogActions><Button onClick={handleCloseDialog}>Fermer</Button></DialogActions>
    </Dialog>
  );
};

export default DialogDetails;
