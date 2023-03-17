import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import DialogDetails from '../detailsParticipant'
import { getParticipants } from '../query/participants'
import { ParticipantType, pb } from '../type'
import ParticipantCard from './card'

interface Props {
  nbrVoters: number
}

export default function Participant({ nbrVoters }: Props) {
  const [participantsList, setParticipantsList] = useState<
    ParticipantType[] | null
  >(null)
  const [participant, setParticipant] = useState<ParticipantType | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

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

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      getListParticipants()
    })
    pb.collection('contre_votes').subscribe('*', function () {
      getListParticipants()
    })
    return () => {
      pb.collection('votes').unsubscribe()
      pb.collection('contre_votes').unsubscribe()
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
        participantsList.map((card, index) => (
          <div className="card-show">
            <ParticipantCard
              id={card.id}
              key={index}
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
        <CircularProgress style={{ marginTop: '40%', color: '#eee' }} />
      )}
    </div>
  )
}
