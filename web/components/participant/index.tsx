import { useEffect, useState } from 'react';
import { getParticipantsVotes } from '../query/participants-votes.query';
import ParticipantCard from './card';

const participants = [
  {
    name: 'ESTI',
    logoSrc:
      'https://pocket.iteam-s.mg/api/files/vlacm5bqbqxzdxo/500kdv43p2emagh/inclusiv_academy_LDAtBZm9di.png',
    votes: 75,
    against: 25,
    voters: [
      'https://randomuser.me/api/portraits/men/79.jpg',
      'https://randomuser.me/api/portraits/men/51.jpg',
    ],
  },
  {
    name: 'ESTI',
    logoSrc:
      'https://pocket.iteam-s.mg/api/files/vlacm5bqbqxzdxo/500kdv43p2emagh/inclusiv_academy_LDAtBZm9di.png',
    votes: 75,
    against: 25,
    voters: [
      'https://randomuser.me/api/portraits/men/79.jpg',
      'https://randomuser.me/api/portraits/men/51.jpg',
    ],
  },
  {
    name: 'ESTI',
    logoSrc:
      'https://pocket.iteam-s.mg/api/files/vlacm5bqbqxzdxo/500kdv43p2emagh/inclusiv_academy_LDAtBZm9di.png',
    votes: 75,
    against: 25,
    voters: [
      'https://randomuser.me/api/portraits/men/79.jpg',
      'https://randomuser.me/api/portraits/men/51.jpg',
    ],
  },
  {
    name: 'ESTI',
    logoSrc:
      'https://pocket.iteam-s.mg/api/files/vlacm5bqbqxzdxo/500kdv43p2emagh/inclusiv_academy_LDAtBZm9di.png',
    votes: 75,
    against: 25,
    voters: [
      'https://randomuser.me/api/portraits/men/79.jpg',
      'https://randomuser.me/api/portraits/men/51.jpg',
    ],
  },
  {
    name: 'ESTI',
    logoSrc:
      'https://pocket.iteam-s.mg/api/files/vlacm5bqbqxzdxo/500kdv43p2emagh/inclusiv_academy_LDAtBZm9di.png',
    votes: 75,
    against: 25,
    voters: [
      'https://randomuser.me/api/portraits/men/79.jpg',
      'https://randomuser.me/api/portraits/men/51.jpg',
    ],
  },
];

export default function Participant() {
  const [participantsListeVotes, setData] = useState<any[]>([]);
  console.log('participantsListeVotes : ', participantsListeVotes);

  useEffect(() => {
    async function fetchData() {
      const participantsVotes = await getParticipantsVotes();
      setData(participantsVotes.items);
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25,
      }}
    >
      {participantsListeVotes &&
        participantsListeVotes.map((card, index) => (
          <ParticipantCard
            key={index}
            name={card.univ_name}
            logoSrc={card.logo}
            votes={
              card.expand && card?.expand['votes(participant)'] != undefined
                ? card.expand['votes(participant)'].length
                : null
            }
            against={
              card.expand &&
              card.expand['contre_votes(participant)'] != undefined
                ? card.expand['votes(participant)'].length
                : null
            }
            voters={
              card.expand && card.expand['votes(participant)'] != undefined
                ? card?.expand['votes(participant)']
                : null
            }
          />
        ))}
    </div>
  );
}
