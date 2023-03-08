import axios, { AxiosRequestConfig } from 'axios';
import { VotersList } from '../type';

export const getVoters = async (): Promise<VotersList> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: process.env.API_URL + 'collections/voters/records',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des VotersList');
  }
};
