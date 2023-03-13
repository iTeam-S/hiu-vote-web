import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import DialogDetails from '../detailsParticipant'
import { getParticipants } from '../query/participants'
import { getParticipantsVotes } from '../query/participants-votes.query'
import { Participants, ParticipantsVotes, pb } from '../type'
import ParticipantCard from './card'

interface Props {
  nbrVoters: number
}

export default function Participant({ nbrVoters }: Props) {
  const [participantsListeVotes, setParticipantsListeVotes] = useState<
    ParticipantsVotes[] | null
  >(null)
  const [participantsList, setParticipantsList] = useState<
    Participants[] | null
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

  async function getListParticipants() {
    const participants = await getParticipants();
    setParticipantsList(participants)
  }

  async function fetchParticipantsVotes() {
    const participantsVotes = await getParticipantsVotes()
    participantsVotes.sort((a, b) => {
      const aLength =
        a.expand && a.expand['votes(participant)']
          ? a.expand['votes(participant)'].length
          : 0
      const bLength =
        b.expand && b.expand['votes(participant)']
          ? b.expand['votes(participant)'].length
          : 0
      return bLength - aLength
    })
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
    getListParticipants();
    fetchParticipantsVotes()
  }, [])

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      fetchParticipantsVotes()
    })
    pb.collection('contre_votes').subscribe('*', function (e) {
      fetchParticipantsVotes()
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
      {participantsDetails && (
        <DialogDetails
          handleCloseDialog={handleCloseDialog}
          open={openDialog}
          participantsDetails={participantsDetails}
          nbrVoters={nbrVoters}
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
              votesPourcentage={card.expand.voters_pourcent.replace(/ %/g, "")}
              votesCount={card.expand.voters_count}
              contreVotesCount={card.expand.voters_count}
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
