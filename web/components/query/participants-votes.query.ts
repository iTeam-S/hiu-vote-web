import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface MyData {
  // Interface pour définir le type de données que nous attendons
  name: string;
  age: number;
  email: string;
}

export const getParticipantsVotes = async (): Promise<any> => {
  console.log('process.env : ', process.env.API_URL);
  const config: AxiosRequestConfig = {
    method: 'get',
    url:
      process.env.API_URL +
      'participants/records?expand=votes(participant).voter,contre_votes(participant).voter',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response: AxiosResponse<any> = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération des données');
  }
};
