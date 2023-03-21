import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import DialogDetails from '../detailsParticipant'
import { getParticipants } from '../query/participants'
import { ParticipantType, pb } from '../type'
import ParticipantCard from './card'

export default function Participant() {
  const [participantsList, setParticipantsList] = useState<
    ParticipantType[] | null
  >(null)
  const [participant, setParticipant] = useState<ParticipantType | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  // delcare variable and get current timestamp
  var latestUpdate = new Date().getTime()
  const delayUpdate = 3000

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  async function getListParticipants() {
    const participants = await getParticipants()
    setParticipantsList(participants)
  }

  async function addListParticipants() {
    const participants = await getParticipants()
    if (participantsList) {
      setParticipantsList([...participantsList, ...participants])
    }
  }

  const initialiseParticipantDetails = () => {
    setParticipant(null)
  }

  const handleClickDetails = async (idParticipant: string) => {
    const participantsDetails = participantsList?.find(
      (element) => element.id === idParticipant,
    )
    if (participantsDetails) {
      setParticipant(participantsDetails)
      handleOpenDialog()
    }
  }

  useEffect(() => {
    getListParticipants()
  }, [])

  function verifBeforeUpdate() {
    if (new Date().getTime() - latestUpdate > delayUpdate) {
      latestUpdate = new Date().getTime()
      addListParticipants()
    }
    else {
      setTimeout(() => {
        verifBeforeUpdate()
      }, delayUpdate)
    }
  }

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      verifBeforeUpdate()
    })
    pb.collection('contre_votes').subscribe('*', function () {
      verifBeforeUpdate()
    })
    return () => {
      // pb.collection('votes').unsubscribe()
      // pb.collection('contre_votes').unsubscribe()
    }
  })

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
      {participant && (
        <DialogDetails
          handleCloseDialog={handleCloseDialog}
          open={openDialog}
          participantsDetails={participant}
          initialiseParticipantDetails={initialiseParticipantDetails}
        />
      )}

      {participantsList ? (
        participantsList.map((card) => (
          <div className="card-show" key={card.id}>
            <ParticipantCard
              id={card.id}
              name={card.univ_name}
              logoSrc={card.collectionId + '/' + card.id + '/' + card.logo}
              votesPourcentage={card.expand.participant_pourcent.replace(
                / %/g,
                '',
              )}
              votesCount={card.expand.voters_count}
              voters={card.expand.votes_preview}
              againstVoters={card.expand.contre_votes_preview}
              contreVotesCount={card.expand.contre_votes_count}
              handleClickDetails={handleClickDetails}
            />
          </div>
        ))
      ) : (
        <CircularProgress style={{ marginTop: 130, color: '#eee' }} />
      )}
    </div>
  )
}
