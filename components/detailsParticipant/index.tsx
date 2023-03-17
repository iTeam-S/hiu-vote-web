import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import { ParticipantType, ParticipantVotesComments } from '../type'
import { Avatar, CardMedia } from '@mui/material'
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
  initialiseParticipantDetails: () => void
}

type PropsComment = {
  avatarSrc: string
  nom: string
  commentaire: string
}

const fetchPerPage = 15

const DialogDetails = ({
  handleCloseDialog,
  open,
  participantsDetails,
  initialiseParticipantDetails,
}: Props) => {
  const [openDrawerAlainay, setOpenDrawerAlainay] = useState(false)
  const [openDrawerZakanay, setOpenDrawerZakanay] = useState(false)

  const [pageAlainay, setPageAlainay] = useState<number>(1)
  const [pageZakanay, setPageZakanay] = useState<number>(1)
  const [totalPageAlainay, setTotalPageAlainay] = useState<number | null>(null)
  const [totalPageZakanay, setTotalPageZakanay] = useState<number | null>(null)
  const [fetchLoading, setFetchLoading] = useState<boolean>(false)
  const [titleComment, setTitleComment] = useState<string>(
    'Alainao sa Zakanao ?',
  )

  const [participantVotesComments, setParticipantVotesComments] = useState<
    ParticipantVotesComments[] | null
  >(null)
  const [participantContreVotesComments, setParticipantContreVotesComments] =
    useState<ParticipantVotesComments[] | null>(null)

  const logoSrc =
    participantsDetails.collectionId +
    '/' +
    participantsDetails.id +
    '/' +
    participantsDetails.logo
  const votesAlainay = participantsDetails.expand.participant_pourcent

  const toggleDrawerAlainay = (newOpenDrawer: boolean) => () => {
    setTitleComment('Alainay')
    setOpenDrawerAlainay(newOpenDrawer)
    if (!newOpenDrawer) setTitleComment('Alainao sa Zakanao ?')
  }
  const toggleDrawerZakanay = (newOpenDrawer: boolean) => () => {
    setTitleComment('Zakanay')
    setOpenDrawerZakanay(newOpenDrawer)
    if (!newOpenDrawer) setTitleComment('Alainao sa Zakanao ?')
  }

  const fetchVotesComments = async () => {
    const newtVotesComments = await getParticipantVotesCommentsList({
      page: pageAlainay,
      perPage: fetchPerPage,
      idParticipant: participantsDetails.id,
      collection: 'votes',
    })
    setTotalPageAlainay(newtVotesComments.totalPages)
    if (participantVotesComments) {
      setParticipantVotesComments([
        ...participantVotesComments,
        ...newtVotesComments.items,
      ])
    } else {
      setParticipantVotesComments(newtVotesComments.items)
    }
    setPageAlainay(pageAlainay + 1)
    setFetchLoading(false)
  }

  const fetchContreVotesComments = async () => {
    const newContreVotesComments = await getParticipantVotesCommentsList({
      page: pageZakanay,
      perPage: fetchPerPage,
      idParticipant: participantsDetails.id,
      collection: 'contre_votes',
    })
    setTotalPageZakanay(newContreVotesComments.totalPages)
    if (participantContreVotesComments) {
      setParticipantContreVotesComments([
        ...participantContreVotesComments,
        ...newContreVotesComments.items,
      ])
    } else {
      setParticipantContreVotesComments(newContreVotesComments.items)
    }
    setPageZakanay((prevPage) => prevPage + 1)
    setFetchLoading(false)
  }

  const handleScrollAlainay = async (event: any) => {
    if (totalPageAlainay && totalPageAlainay >= pageAlainay) {
      const scrollLevel = event.target.scrollHeight - event.target.scrollTop
      const bottom =
        scrollLevel >= event.target.clientHeight - 3 &&
        scrollLevel <= event.target.clientHeight + 3
      if (bottom) {
        setFetchLoading(true)
        fetchVotesComments()
      }
    }
  }
  const handleScrollZakanay = async (event: any) => {
    if (totalPageZakanay && totalPageZakanay >= pageZakanay) {
      const scrollLevel = event.target.scrollHeight - event.target.scrollTop
      const bottom =
        scrollLevel >= event.target.clientHeight - 3 &&
        scrollLevel <= event.target.clientHeight + 3
      if (bottom) {
        setFetchLoading(true)
        fetchContreVotesComments()
      }
    }
  }

  const handleCloseDialogInitialise = () => {
    handleCloseDialog()
    setParticipantVotesComments(null)
    setParticipantContreVotesComments(null)
    setPageAlainay(1)
    setPageZakanay(1)
    setTotalPageAlainay(null)
    setTotalPageZakanay(null)
    initialiseParticipantDetails()
  }

  useEffect(() => {
    setFetchLoading(true)
    fetchVotesComments()
    fetchContreVotesComments()
  }, [participantsDetails])

  return (
    <Dialog open={open} onClose={handleCloseDialogInitialise} fullWidth>
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
                Voir plus
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
                Voir plus
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
            title={titleComment}
            openDrawer={openDrawerAlainay}
            toggleDrawer={toggleDrawerAlainay}
            handleScroll={handleScrollAlainay}
          >
            {participantVotesComments &&
              participantVotesComments.map((voteComment, index) => (
                <div className={styles.comments}>
                  <Comment
                    key={index}
                    avatarSrc={voteComment.expand.voter.profil_pic}
                    nom={voteComment.expand.voter.name}
                    commentaire={voteComment.comment}
                  />
                </div>
              ))}
            {fetchLoading && <CircularProgress />}
          </SwipeableEdgeDrawer>

          <div>
            <SwipeableEdgeDrawer
              title={titleComment}
              openDrawer={openDrawerZakanay}
              toggleDrawer={toggleDrawerZakanay}
              handleScroll={handleScrollZakanay}
            >
              {participantContreVotesComments &&
                participantContreVotesComments.map((voteComment, index) => (
                  <div className={styles.comments}>
                    <Comment
                      key={index}
                      avatarSrc={voteComment.expand.voter.profil_pic}
                      nom={voteComment.expand.voter.name}
                      commentaire={voteComment.comment}
                    />
                  </div>
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
  )
}

export default DialogDetails
