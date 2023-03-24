import { ReactNode } from 'react'
import PocketBase from 'pocketbase'

// ===========================================================

export const pb = new PocketBase(process.env.API_REALTIME)

export interface I_ParticipantsVotes {
  city: string
  collectionId: string
  collectionName: string
  created: Date
  description: string
  expand?: I_ParticipantsVoteExpand
  full_univ_name: string
  id: string
  logo: string
  univ_name: string
  updated: Date
}

export interface I_ParticipantsVoteExpand {
  'contre_votes(participant)'?: I_VotesParticipant[]
  'votes(participant)'?: I_VotesParticipant[]
}

export interface I_VotesParticipant {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: I_Voters
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface I_Voters {
  voter: I_Voter
}

export interface I_VotersList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: I_ItemVoter[]
}

export interface I_ItemVoter {
  collectionId: string
  collectionName: string
  created: Date
  fb_id: string
  id: string
  name: string
  profil_pic: string
  updated: Date
}

export interface I_ParticipantType {
  city: string
  collectionId: string
  collectionName: string
  created: Date
  description: string
  expand: I_ParticipantsListExpand
  full_univ_name: string
  id: string
  logo: string
  univ_name: string
  updated: Date
}

export interface I_ParticipantsListExpand {
  contre_votes_count: number
  contre_votes_preview: I_VotesPreview[]
  participant_pourcent: string
  voters_count: number
  votes_preview: I_VotesPreview[]
}

export interface I_VotesPreview {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: I_VotesPreviewExpand
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface I_VotesPreviewExpand {
  voter: I_Voter
}

export interface I_Voter {
  collectionId: string
  collectionName: string
  created: Date
  expand?: I_VoterExpand
  fb_id: string
  id: string
  name: string
  profil_pic: string
  updated: Date
}

export interface I_ParticipantVotesCommentsList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: I_ParticipantVotesComments[]
}

export type T_ParticipantVotesCommentsList = {
  page: number
  perPage: number
  idParticipant: string
  collection: string
}

export interface I_ParticipantVotesComments {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: I_ExpandParticipantVotesComments
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface I_ExpandParticipantVotesComments {
  voter: I_Voter
}

export interface I_VoterExpand {
  'votes(voter)': I_VotesVoter
}

export interface I_VotesVoter {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: I_VotesVoterExpand
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface I_VotesVoterExpand {
  participant: I_ParticipantType
}

export interface I_TypingEffect {
  user: string
  host: string
  lists: string[]
  root: boolean
}

export type T_AlainayCard = {
  votesPourcentage: string
  votesCount: number
  voters?: I_VotesParticipant[] | null
}

export type T_ZakanayCard = {
  contreVotesCount: number
  againstVoters?: I_VotesParticipant[] | null
}

export interface I_User {
  login: string
  avatar_url: string
}

export type T_DialogDetails = {
  handleCloseDialog: () => void
  open: boolean
  participantsDetails: ParticipantType
  initialiseParticipantDetails: () => void
}

export type T_Comment = {
  avatarSrc: string
  nom: string
  commentaire: string
  alainy?: string
}

export type T_SwipeableEdgeDrawer = {
  children: ReactNode
  title: string
  titleClass: string
  openDrawer: boolean
  toggleDrawer: (newOpenDrawer: boolean) => () => void
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void
}

export type T_ParticipantCard = {
  id: string
  name: string
  logoSrc: string
  votesPourcentage: string
  votesCount: number
  contreVotesCount: number
  handleClickDetails: (id: string) => void
}

export type T_DetailsButton = {
  id: string
  handleClickDetails: (id: string) => void
}

export interface I_PrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start'
}

export interface I_SidebarLayout {}

/* ///////////////// */
export interface ParticipantType {
  city: string
  collectionId: string
  collectionName: string
  created: Date
  description: string
  expand: ExpandParticipantType
  full_univ_name: string
  id: string
  logo: string
  univ_name: string
  updated: Date
}

export interface ExpandParticipantType {
  contre_votes_count: number
  participant_pourcent: string
  voters_count: number
}

export interface T_CommentOpt {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: ExpandVoter
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface ExpandVoter {
  voter: Voter
}

export interface Voter {
  collectionId: string
  collectionName: string
  created: Date
  fb_id: string
  id: string
  name: string
  profil_pic: string
  updated: Date
}

export type T_ThreeVotesProps = {
  idParticipant: string
  collection: string
}
