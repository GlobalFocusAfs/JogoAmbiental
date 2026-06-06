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

  const calcLevelFromLegacyPoints = (points) => {
    const p = Number.isFinite(Number(points)) ? Number(points) : 0;
    const XP_PER_LEVEL = 500;
    return Math.floor(p / XP_PER_LEVEL) + 1;
  };

  const getTitleByLevel = (lvl) => {
    if (lvl <= 1) return 'Eco Aprendiz';
    if (lvl === 2) return 'Amigo da Terra';
    if (lvl === 3) return 'Protetor Verde';
    if (lvl === 4) return 'Eco Guardião';
    if (lvl === 5) return 'Mestre Sustentável';
    return 'Guardião da Floresta Viva';
  };

  return (
    <div className="card">
      <h3>🏆 Ranking EcoLutadores</h3>
      <div className="ranking-list">
        {ranking.length === 0 ? (
          <p>Carregando ranking...</p>
        ) : (
          ranking.map((u, idx) => {
            const level = typeof u?.level === 'number' ? u.level : calcLevelFromLegacyPoints(u?.points);
            const title = getTitleByLevel(level);
            return (
              <div key={u._id} className="ranking-item">
                <span>
                  {idx + 1}. {u.name} — <em>{title}</em>
                </span>
                <strong>{u.points} pts</strong>
              </div>
            );
          })
        )}
      </div>
      <button className="btn" onClick={fetchRanking}>📊 Atualizar Ranking</button>
    </div>
  );
}
