import axios, { AxiosRequestConfig } from 'axios'

/* types */
import { I_VotersList } from '../types'

// ===========================================================

export const getVoters = async (): Promise<I_VotersList> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + 'collections/voters/records',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    throw new Error('[API]: Erreur lors de la récupération des Voters')
  }
}
