import PocketBase from 'pocketbase'
export interface ParticipantsVotes {
  city: string
  collectionId: string
  collectionName: string
  created: Date
  description: string
  expand?: ParticipantsVoteExpand
  full_univ_name: string
  id: string
  logo: string
  univ_name: string
  updated: Date
}

export interface ParticipantsVoteExpand {
  'contre_votes(participant)'?: VotesParticipant[]
  'votes(participant)'?: VotesParticipant[]
}

export interface VotesParticipant {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: Voters
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface Voters {
  voter: Voter
}
export interface VotersList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: ItemVoter[]
}

export interface ItemVoter {
  collectionId: string
  collectionName: string
  created: Date
  fb_id: string
  id: string
  name: string
  profil_pic: string
  updated: Date
}

export const pb = new PocketBase(process.env.API_REALTIME)

export interface ParticipantType {
  city: string
  collectionId: string
  collectionName: string
  created: Date
  description: string
  expand: ParticipantsListExpand
  full_univ_name: string
  id: string
  logo: string
  univ_name: string
  updated: Date
}

export interface ParticipantsListExpand {
  contre_votes_count: number
  contre_votes_preview: VotesPreview[]
  participant_pourcent: string
  voters_count: number
  votes_preview: VotesPreview[]
}

export interface VotesPreview {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: VotesPreviewExpand
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface VotesPreviewExpand {
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

//****************** */
export interface ParticipantVotesCommentsList {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: ParticipantVotesComments[]
}

export interface ParticipantVotesComments {
  collectionId: string
  collectionName: string
  comment: string
  created: Date
  expand: ExpandParticipantVotesComments
  id: string
  participant: string
  updated: Date
  voter: string
}

export interface ExpandParticipantVotesComments {
  voter: Voter
}
