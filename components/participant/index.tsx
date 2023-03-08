import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getParticipantsVotes } from '../query/participants-votes.query';
import { ParticipantsVotes, pb } from '../type';
import ParticipantCard from './card';

interface Props {
  nbrVoters: number
}


export default function Participant({nbrVoters}: Props) {
  const [participantsListeVotes, setData] = useState<
    ParticipantsVotes[] | null
  >(null);
  async function fetchParticipantsVotes() {
    const participantsVotes = await getParticipantsVotes();
    setData(participantsVotes);
  }
  useEffect(() => {
    fetchParticipantsVotes();
  }, []);

  useEffect(() => {
    pb.collection('votes').subscribe('*', async function () {
      fetchParticipantsVotes();
    });
    pb.collection('contre_votes').subscribe('*', function (e) {
      fetchParticipantsVotes();
    });
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 50,
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
