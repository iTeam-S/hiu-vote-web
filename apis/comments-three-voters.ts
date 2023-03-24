import axios, { AxiosRequestConfig } from 'axios'

/* types */
import { T_CommentOpt, T_ThreeVotesProps } from '../types'

// ===========================================================

export const getThreeVotes = async ({
  idParticipant,
  collection,
}: T_ThreeVotesProps): Promise<T_CommentOpt[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url:
      process.env.API_URL +
      `collections/${collection}/records?sort=-updated&perPage=3&filter=participant%3D'${idParticipant}'&expand=voter`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data.items
  } catch (error) {
    throw new Error('[API]: Erreur lors de la récupération des getThreeVotes')
  }
}
