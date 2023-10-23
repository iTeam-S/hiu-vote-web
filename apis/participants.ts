import axios, { AxiosRequestConfig } from 'axios'

/* types */
import { I_ParticipantType } from '../types'

export const getParticipants = async (): Promise<I_ParticipantType[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url:
      process.env.API_URL +
      'custom/participants?expand=votes(participant).voter,contre_votes(participant).voter',
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
