import React, { useEffect, useState } from 'react'

/* mui */
import {
  Button,
  Dialog,
  DialogActions,
  Box,
  Typography,
  CircularProgress,
  Avatar,
  CardMedia,
} from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'

/* icons */
import { AiFillHeart } from 'react-icons/ai'
import { GiStrong } from 'react-icons/gi'

/* components */
import SwipeableEdgeDrawer from '../drawer/drawer'

/* apis */
import { getParticipantVotesCommentsList } from '../../apis/participant-votes-comments-list'
import { getParticipantDescription } from '../../apis/participant-description'

/* types */
import {
  I_ParticipantVotesComments,
  T_DialogDetails,
  T_Comment,
} from '../../types'

/* styles */
import styles from './details.module.css'

/* global */
const fetchPerPage = 25

// ===========================================================

function Comment({ avatarSrc, nom, commentaire, alainy }: T_Comment) {
  const alainyUniv = alainy ? "(mpanohana an'i " + alainy + ')' : null
  return (
    <React.Fragment>
      <Box display="flex" alignItems="center">
        <Avatar src={avatarSrc} />
        <Box ml={2}>
          <Typography variant="subtitle1">
            {nom} {alainyUniv ?? null}
          </Typography>
          <Typography variant="body1">{commentaire}</Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default function DialogDetails({
  handleCloseDialog,
  open,
  participantsDetails,
  initialiseParticipantDetails,
}: T_DialogDetails) {
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
  const [description, setDescription] = useState<string | null>(null)
  const [participantVotesComments, setParticipantVotesComments] = useState<
    I_ParticipantVotesComments[] | null
  >(null)
  const [participantContreVotesComments, setParticipantContreVotesComments] =
    useState<I_ParticipantVotesComments[] | null>(null)
  const logoSrc =
    participantsDetails.collectionId +
    '/' +
    participantsDetails.id +
    '/' +
    participantsDetails.logo
  const votesAlainayCount = participantsDetails.expand.participant_pourcent
  const votesZakanayCount = participantsDetails.expand.contre_votes_count

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

  const fetchFirstVotesComments = async () => {
    const newtVotesComments = await getParticipantVotesCommentsList({
      page: pageAlainay,
      perPage: fetchPerPage,
      idParticipant: participantsDetails.id,
      collection: 'votes',
    })
    setTotalPageAlainay(newtVotesComments.totalPages)
    setParticipantVotesComments(newtVotesComments.items)
    setPageAlainay(pageAlainay + 1)
    setFetchLoading(false)
  }

  const fetchFirstContreVotesComments = async () => {
    const newContreVotesComments = await getParticipantVotesCommentsList({
      page: pageZakanay,
      perPage: fetchPerPage,
      idParticipant: participantsDetails.id,
      collection: 'contre_votes',
    })
    setTotalPageZakanay(newContreVotesComments.totalPages)
    setParticipantContreVotesComments(newContreVotesComments.items)
    setPageZakanay((prevPage) => prevPage + 1)
    setFetchLoading(false)
  }

  const fetchVotesComments = async () => {
    const newtVotesComments = await getParticipantVotesCommentsList({
      page: pageAlainay,
      perPage: fetchPerPage,
      idParticipant: participantsDetails.id,
      collection: 'votes',
    })
    if (participantVotesComments) {
      setParticipantVotesComments([
        ...participantVotesComments,
        ...newtVotesComments.items,
      ])
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
    if (participantContreVotesComments) {
      setParticipantContreVotesComments([
        ...participantContreVotesComments,
        ...newContreVotesComments.items,
      ])
    }
    setPageZakanay((prevPage) => prevPage + 1)
    setFetchLoading(false)
  }

  const fetchDescription = async () => {
    const description = await getParticipantDescription(participantsDetails.id)
    if (description) setDescription(description)
  }

  // eslint-disable-next-line
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

  // eslint-disable-next-line
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

  const initializeState = () => {
    setParticipantVotesComments(null)
    setParticipantContreVotesComments(null)
    setPageAlainay(1)
    setPageZakanay(1)
    setTotalPageAlainay(null)
    setTotalPageZakanay(null)
    setDescription(null)
    initialiseParticipantDetails()
  }

  const handleCloseDialogInitialise = () => {
    initializeState()
    handleCloseDialog()
  }

  useEffect(() => {
    setFetchLoading(true)
    fetchFirstVotesComments()
    fetchFirstContreVotesComments()
    fetchDescription()
  }, [participantsDetails])

  return (
    <React.Fragment>
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
          <p className={styles.description}>
            {description ? (
              description
            ) : (
              <CircularProgress
                size={30}
                style={{
                  color: '#eee',
                  marginLeft: '45%',
                }}
              />
            )}
          </p>
          <div className={styles.alainay}>
            <span>
              <AiFillHeart size={50} /> &nbsp; Alainay
            </span>
            <h2>{votesAlainayCount}</h2>
            <hr />
            <div className={styles.avatar}>
              <div className={styles.more}>
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
            <h2>{votesZakanayCount}</h2>
            <hr />
            <div className={styles.avatar}>
              <div className={styles.more}>
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
              titleClass="title-alinay"
              openDrawer={openDrawerAlainay}
              toggleDrawer={toggleDrawerAlainay}
              handleScroll={handleScrollAlainay}
            >
              {participantVotesComments &&
                participantVotesComments.map((voteComment, index) => (
                  <div className={styles.comments} key={index}>
                    <Comment
                      avatarSrc={voteComment.expand.voter.profil_pic}
                      nom={voteComment.expand.voter.name}
                      commentaire={voteComment.comment}
                    />
                  </div>
                ))}
              {fetchLoading && (
                <CircularProgress
                  size={30}
                  style={{
                    color: '#eee',
                    marginTop: '50%',
                  }}
                />
              )}
            </SwipeableEdgeDrawer>

            <div>
              <SwipeableEdgeDrawer
                title={titleComment}
                titleClass={openDrawerZakanay ? '' : 'title-zakanay'}
                openDrawer={openDrawerZakanay}
                toggleDrawer={toggleDrawerZakanay}
                handleScroll={handleScrollZakanay}
              >
                {participantContreVotesComments &&
                  participantContreVotesComments.map((voteComment, index) => (
                    <div className={styles.comments} key={index}>
                      <Comment
                        avatarSrc={voteComment.expand.voter.profil_pic}
                        nom={voteComment.expand.voter.name}
                        commentaire={voteComment.comment}
                        alainy={
                          voteComment.expand.voter.expand?.['votes(voter)']
                            .expand.participant.univ_name
                        }
                      />
                    </div>
                  ))}
                {fetchLoading && (
                  <CircularProgress
                    size={30}
                    style={{
                      color: '#eee',
                    }}
                  />
                )}
              </SwipeableEdgeDrawer>
            </div>
          </StyledEngineProvider>
        </div>
      </Dialog>
    </React.Fragment>
  )
}