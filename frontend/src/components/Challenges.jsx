export default function Challenges({ user, updateUserAction }) {
  const today = new Date().toDateString();
  const completed = user?.challenges?.lastChallengeDate === today;

  const challengeButtons = [
    {
      label: '🗑️ Reciclar hoje',
      action: { challengeType: 'recycle', points: 20, incrementField: 'recyclings' },
      done: user?.challenges?.recycle
    },
    {
      label: '🚶 Caminhar +500m',
      action: { challengeType: 'walk', points: 25, incrementField: 'walks' },
      done: user?.challenges?.walk
    },
    {
      label: '💧 Beber água',
      action: { challengeType: 'water', points: 15, incrementField: 'points' },
      done: user?.challenges?.water
    }
  ];

  return (
    <div className="card">
      <h3>🎯 Desafios diários</h3>
      <div className="challenge-grid">
        {challengeButtons.map((challenge) => (
          <button
            key={challenge.action.challengeType}
            className={challenge.done ? 'btn secondary disabled' : 'btn'}
            onClick={() => updateUserAction('completeChallenge', challenge.action)}
            disabled={challenge.done}
          >
            {challenge.done ? '✅ ' : ''}{challenge.label}
          </button>
        ))}
      </div>
      {completed && <p className="note">Desafios atualizados para hoje.</p>}
    </div>
  );
}
