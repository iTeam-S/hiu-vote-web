import axios, { AxiosRequestConfig } from 'axios';
import { ParticipantsVotes } from '../type';

export const getParticipantsVotes = async (): Promise<ParticipantsVotes[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url:
      process.env.API_URL +
      'collections/participants/records?expand=votes(participant).voter,contre_votes(participant).voter',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response.data.items;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des ParticipantsVotes');
  }
};
