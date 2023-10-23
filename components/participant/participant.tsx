import React, { useEffect, useState } from 'react'

/* mui */
import { CircularProgress } from '@mui/material'

/* components */
import DialogDetails from '../details/details'
import ParticipantCard from '../card/participant.card'

/* apis */
import { getParticipantsList } from '../../apis/participants-list'

/* types */
import { ParticipantType, pb } from '../../types'

const delayUpdate = 7000
export default function Participant() {
  const [participantsList, setParticipantsList] = useState<
    ParticipantType[] | null
  >(null)
  const [participant, setParticipant] = useState<ParticipantType | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  let latestUpdate = new Date().getTime()

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  async function getListParticipants() {
    const participants = await getParticipantsList()
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

  function verifBeforeUpdate(otherAttempt = false) {
    if (new Date().getTime() - latestUpdate > delayUpdate) {
      latestUpdate = new Date().getTime()
      getListParticipants()
    } else {
      if (!otherAttempt) {
        setTimeout(() => {
          verifBeforeUpdate(true)
        }, delayUpdate)
      }
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
    <React.Fragment>
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
                contreVotesCount={card.expand.contre_votes_count}
                handleClickDetails={handleClickDetails}
              />
            </div>
          ))
        ) : (
          <CircularProgress style={{ marginTop: 130, color: '#eee' }} />
        )}
      </div>
    </React.Fragment>
  )
}
