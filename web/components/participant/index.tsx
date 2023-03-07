import { useEffect, useState } from 'react';
import { getParticipantsVotes } from '../query/participants-votes.query';
import { ParticipantsVotes } from '../type';
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
  const [participantsListeVotes, setData] = useState<
    ParticipantsVotes[] | null
  >(null);
  console.log(participantsListeVotes);
  useEffect(() => {
    async function fetchData() {
      const participantsVotes = await getParticipantsVotes();
      setData(participantsVotes);
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
        marginBottom: 50,
      }}
    >
      {participantsListeVotes &&
        participantsListeVotes.map((card, index) => (
          <ParticipantCard
            key={index}
            name={card.univ_name}
            logoSrc={card.collectionId + '/' + card.id + '/' + card.logo}
            votes={
              card.expand && card.expand['votes(participant)']
                ? card.expand['votes(participant)'].length
                : 0
            }
            against={
              card.expand && card.expand['contre_votes(participant)']
                ? card.expand['contre_votes(participant)'].length
                : 0
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
        ))}
    </div>
  );
}
