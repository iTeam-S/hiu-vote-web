import axios, { AxiosRequestConfig } from 'axios'
import { ParticipantVotesCommentsList } from '../../types'

interface Params {
  page: number
  perPage: number
  idParticipant: string
  collection: string
}

export const getParticipantVotesCommentsList = async ({
  page,
  perPage,
  idParticipant,
  collection,
}: Params): Promise<ParticipantVotesCommentsList> => {
  const expand =
    collection === 'votes' ? 'voter' : 'voter.votes(voter).participant'
  const config: AxiosRequestConfig = {
    method: 'get',
    url:
      process.env.API_URL +
      `collections/${collection}/records?filter=(participant='${idParticipant}')&expand=${expand}&page=${page}&perPage=${perPage}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    throw new Error(
      'Erreur lors de la récupération des ParticipantVotesCommentsList',
    )
  }
}
