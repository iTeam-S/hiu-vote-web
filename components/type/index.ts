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

export interface Participants {
  city: string
  collectionId: string
  collectionName: string
  created: Date
  description: string
  expand: ExpandParticipants
  full_univ_name: string
  id: string
  logo: string
  univ_name: string
  updated: Date
}

export interface ExpandParticipants {
  voters_count: number
  voters_pourcent: string
}
