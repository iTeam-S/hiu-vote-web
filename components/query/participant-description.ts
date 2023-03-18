import axios, { AxiosRequestConfig } from 'axios'

export const getParticipantDescription = async (
  idParticipant: string,
): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url:
      process.env.API_URL + `collections/participants/records/${idParticipant}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios(config)
    return response.data.description
  } catch (error) {
    throw new Error(
      'Erreur lors de la récupération des getParticipantDescription',
    )
  }
}
