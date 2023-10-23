import axios, { AxiosRequestConfig } from 'axios'

/* types */
import { I_SponsorsList } from '../types'

export const getSponsors = async (): Promise<I_SponsorsList> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + 'collections/sponsors/records',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    throw new Error('[API]: Erreur lors de la récupération des Sponsors')
  }
}
