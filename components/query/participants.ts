import axios, { AxiosRequestConfig } from 'axios'
import { Participants } from '../type'

export const getParticipants = async (): Promise<Participants[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + 'custom/participants',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    throw new Error('Erreur lors de la récupération des Participants')
  }
}
