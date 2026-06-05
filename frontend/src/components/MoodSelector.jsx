import { useEffect, useState } from 'react';

export default function MoodSelector({ user, setMood }) {
  const [active, setActive] = useState(user?.mood || 'neutro');
  const moods = [
    { value: 'feliz', label: '😄', emotion: 'felicidade' },
    { value: 'tranquilo', label: '🙂', emotion: 'calma' },
    { value: 'neutro', label: '😐', emotion: 'neutralidade' },
    { value: 'ansioso', label: '😟', emotion: 'ansiedade' },
    { value: 'triste', label: '😢', emotion: 'tristeza' }
  ];

  useEffect(() => {
    setActive(user?.mood || 'neutro');
  }, [user?.mood]);

  const handleClick = (mood) => {
    setActive(mood.value);
    setMood(mood.value);
  };

  return (
    <div className="card">
      <h3>🧠 Como você está hoje?</h3>
      <div className="humor">
        {moods.map((m) => (
          <button
            key={m.value}
            className={active === m.value ? 'active-mood' : ''}
            onClick={() => handleClick(m)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="note">Seu humor ajuda a IA a dar sugestões personalizadas.</p>
    </div>
  );
}
