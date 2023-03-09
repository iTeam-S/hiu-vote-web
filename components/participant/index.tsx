import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import DialogDetails from '../detailsParticipant'
import { getParticipantsVotes } from '../query/participants-votes.query'
import { ParticipantsVotes, pb } from '../type'
import ParticipantCard from './card'

interface Props {
  nbrVoters: number
}

<<<<<<< HEAD
export default function Participant({ nbrVoters }: Props) {
  const [participantsListeVotes, setParticipantsListeVotes] = useState<
    ParticipantsVotes[] | null
  >(null)
  const [participantsDetails, setParticipantsDetails] =
    useState<ParticipantsVotes | null>(null)

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  async function fetchParticipantsVotes() {
    const participantsVotes = await getParticipantsVotes()
    setParticipantsListeVotes(participantsVotes)
  }
  const handleClickDetails = (idParticipant: string) => {
    const participantsDetails = participantsListeVotes?.find(
      (element) => element.id === idParticipant,
    )
    if (participantsDetails) {
      setParticipantsDetails(participantsDetails)
      handleOpenDialog()
    }
  }
  useEffect(() => {
    fetchParticipantsVotes()
  }, [])

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      fetchParticipantsVotes()
    })
    pb.collection('contre_votes').subscribe('*', function (e) {
      fetchParticipantsVotes()
    })
  })
=======
export default function Participant({nbrVoters}: Props) {
  const [participantsListeVotes, setParticipantsListeVotes] = useState<
    ParticipantsVotes[] | null>(null);
  const [participantsDetails, setParticipantsDetails] = useState<
    ParticipantsVotes | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function fetchParticipantsVotes() {
    const participantsVotes = await getParticipantsVotes();
    setParticipantsListeVotes(participantsVotes);
  }
  const handleClickDetails = (idParticipant: string) => {
    const participantsDetails = participantsListeVotes?.find((element) => element.id === idParticipant);
    if (participantsDetails) {
      setParticipantsDetails(participantsDetails);
      handleOpenDialog();
    }
  }
  useEffect(() => {
    fetchParticipantsVotes();
  }, []);

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      fetchParticipantsVotes();
    });
    pb.collection('contre_votes').subscribe('*', function (e) {
      fetchParticipantsVotes();
    });
  });
>>>>>>> origin/main

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
      }}
    >
<<<<<<< HEAD
      {participantsDetails && (
        <DialogDetails
          handleCloseDialog={handleCloseDialog}
          open={openDialog}
          participantsDetails={participantsDetails}
          nbrVoters={nbrVoters}
        />
      )}

=======
      {
        participantsDetails && <DialogDetails handleCloseDialog={handleCloseDialog} open={openDialog} participantsDetails={participantsDetails} nbrVoters={nbrVoters}/>
      }
      
>>>>>>> origin/main
      {participantsListeVotes ? (
        participantsListeVotes.map((card, index) => (
          <div className="card-show">
            <ParticipantCard
              id={card.id}
              key={index}
              name={card.univ_name}
              logoSrc={card.collectionId + '/' + card.id + '/' + card.logo}
              votes={
                card.expand && card.expand['votes(participant)']
                  ? (
                      (card.expand['votes(participant)'].length / nbrVoters) *
                      100
                    )
                      .toFixed(2)
                      .toString()
                  : '0'
              }
              voters={
                card.expand && card.expand['votes(participant)']
                  ? card.expand['votes(participant)']
                  : null
              }
              againstVoters={
                card.expand && card.expand['contre_votes(participant)']
                  ? card.expand['contre_votes(participant)']
                  : null
              }
              handleClickDetails={handleClickDetails}
            />
          </div>
        ))
      ) : (
        <CircularProgress style={{ marginTop: 100 }} color="success" />
      )}
    </div>
  )
}
