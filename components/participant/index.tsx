import { CircularProgress } from '@mui/material';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { getParticipantsVotes } from '../query/participants-votes.query';
import { getVoters } from '../query/voters.query';
import { ParticipantsVotes } from '../type';
import ParticipantCard from './card';

const pb = new PocketBase(process.env.API_REALTIME);

export default function Participant() {
  const [participantsListeVotes, setData] = useState<
    ParticipantsVotes[] | null
  >(null);
  const [nbrVoters, setNbrVoters] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const votersList = await getVoters();
      setNbrVoters(votersList.totalItems);
      const participantsVotes = await getParticipantsVotes();
      setData(participantsVotes);
    }

    fetchData();
  }, []);

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      const participantsVotes = await getParticipantsVotes();
      setData(participantsVotes);
    });
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 20,
      }}
    >
      {participantsListeVotes ? (
        participantsListeVotes.map((card, index) => (
          <ParticipantCard
            key={index}
            name={card.univ_name}
            logoSrc={card.collectionId + '/' + card.id + '/' + card.logo}
            votes={
              card.expand && card.expand['votes(participant)']
                ? ((card.expand['votes(participant)'].length / nbrVoters) * 100)
                    .toFixed(2)
                    .toString()
                : '0'
            }
            voters={
              card.expand && card.expand['votes(participant)']
                ? card.expand['votes(participant)']
                : null
            }
            againstVoters={
              card.expand && card.expand['contre_votes(participant)']
                ? card.expand['contre_votes(participant)']
                : null
            }
          />
        ))
      ) : (
        <CircularProgress style={{ marginTop: 100 }} color="success" />
      )}
    </div>
  );
}
