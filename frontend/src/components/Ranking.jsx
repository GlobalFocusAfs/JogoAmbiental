import { useEffect, useState } from 'react';
import { getRanking } from '../api';

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  const fetchRanking = async () => {
    try {
      const { data } = await getRanking();
      setRanking(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <div className="card">
      <h3>🏆 Ranking EcoLutadores</h3>
      <div className="ranking-list">
        {ranking.length === 0 ? (
          <p>Carregando ranking...</p>
        ) : (
          ranking.map((u, idx) => (
            <div key={u._id} className="ranking-item">
              <span>{idx + 1}. {u.name}</span>
              <strong>{u.points} pts</strong>
            </div>
          ))
        )}
      </div>
      <button className="btn" onClick={fetchRanking}>📊 Atualizar Ranking</button>
    </div>
  );
}
