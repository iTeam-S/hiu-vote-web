import axios, { AxiosRequestConfig } from 'axios'

/* types */
import {
  I_ParticipantVotesCommentsList,
  T_ParticipantVotesCommentsList,
} from '../types'

// ===========================================================

export const getParticipantVotesCommentsList = async ({
  page,
  perPage,
  idParticipant,
  collection,
}: T_ParticipantVotesCommentsList): Promise<I_ParticipantVotesCommentsList> => {
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
      '[API]: Erreur lors de la récupération des ParticipantVotesCommentsList',
    )
  }
}
