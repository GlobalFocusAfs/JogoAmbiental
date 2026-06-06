export default function Dashboard({ user, editUserName }) {
  const calcularNivel = (pts) => {
    if (pts < 500) return { nivel: 1, nome: 'Eco Aprendiz', progresso: (pts / 500) * 100 };
    if (pts < 1000) return { nivel: 2, nome: 'Amigo da Terra', progresso: ((pts - 500) / 500) * 100 };
    if (pts < 1600) return { nivel: 3, nome: 'Protetor Verde', progresso: ((pts - 1000) / 600) * 100 };
    if (pts < 2200) return { nivel: 4, nome: 'Eco Guardião', progresso: ((pts - 1600) / 600) * 100 };
    return { nivel: 5, nome: 'Mestre Sustentável', progresso: Math.min(100, ((pts - 2200) / 800) * 100) };
  };

  // Novo: se xp/level existirem, usa; senão, mantém compatibilidade com o cálculo antigo baseado em points.
  const xp = user?.xp;
  const levelFromUser = user?.level;

  const XP_PER_LEVEL = 500;
  const calcTitleByLevel = (lvl) => {
    if (lvl <= 1) return { nivel: 1, nome: 'Eco Aprendiz' };
    if (lvl === 2) return { nivel: 2, nome: 'Amigo da Terra' };
    if (lvl === 3) return { nivel: 3, nome: 'Protetor Verde' };
    if (lvl === 4) return { nivel: 4, nome: 'Eco Guardião' };
    if (lvl === 5) return { nivel: 5, nome: 'Mestre Sustentável' };
    return { nivel: 6, nome: 'Guardião da Floresta Viva' };
  };

  const useXP = typeof xp === 'number' && typeof levelFromUser === 'number';
  const fallback = calcularNivel(user?.points || 0);

  const { nivel, nome } = useXP ? calcTitleByLevel(levelFromUser) : fallback;
  const progresso = useXP
    ? Math.max(0, Math.min(100, ((xp - (nivel - 1) * XP_PER_LEVEL) / XP_PER_LEVEL) * 100))
    : fallback.progresso;

  return (
    <div className="top-card card">
      <div className="dashboard-header">
        <div>
          <h2>🌱 EcoMente</h2>
          <p>Olá, <strong>{user?.name}</strong>!</p>
        </div>
        <button className="icon-btn" onClick={editUserName}>✏️</button>
      </div>
      <div className="nivel">Nível {nivel} - {nome}</div>
      <div className="barra"><div className="progresso" style={{ width: `${progresso}%` }} /></div>
      <p>📈 {Math.floor(progresso)}% para o próximo nível</p>
      <div className="stats-row">
        <div><strong>{user?.trees}</strong><span>Árvores</span></div>
        <div><strong>{user?.recyclings}</strong><span>Reciclagens</span></div>
        <div><strong>{user?.walks}</strong><span>Caminhadas</span></div>
      </div>
    </div>
  );
}
