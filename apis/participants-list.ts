import axios, { AxiosRequestConfig } from 'axios'

/* types */
import { ParticipantType } from '../types'

// ===========================================================

export const getParticipantsList = async (): Promise<ParticipantType[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + 'custom/participants/lite',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    throw new Error('[API]: Erreur lors de la récupération des Participants')
  }
}
