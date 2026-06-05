import { useState } from 'react';

export default function MissionCard({ user, updateUserAction }) {
  const [msg, setMsg] = useState('');
  const today = new Date().toDateString();
  const alreadyDone = user?.lastMissionDate === today && user?.missionCompleted;

  const handleComplete = async () => {
    if (alreadyDone) {
      setMsg('⚠️ Missão já concluída hoje!');
      return;
    }
    await updateUserAction('completeMission');
    setMsg('🎉 Missão completa! +50 pontos e +1 árvore!');
  };

  return (
    <div className="card">
      <h3>🌱 Missão do Dia</h3>
      <p>🌿 Plante uma muda, cuide de uma planta ou faça algo verde.</p>
      <p>🏆 Recompensa: +50 pontos +1 árvore</p>
      <button className="btn" onClick={handleComplete} disabled={alreadyDone}>
        ✅ Concluir Missão
      </button>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
}
