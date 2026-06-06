import { getTitleByLevel } from '../utils/levelTitles';

export default function Dashboard({ user, editUserName }) {
  const XP_PER_LEVEL = 500;

  const xp = user?.xp;
  const level = user?.level;

  // Prioriza 100% o cálculo via XP/nível do backend.
  // Fallback só para não quebrar se o backend ainda não tiver normalizado o usuário.
  const safeXp = Number.isFinite(Number(xp)) ? Number(xp) : 0;
  const safeLevel = Number.isFinite(Number(level)) ? Number(level) : 1;

  const nome = typeof safeLevel === 'number' ? getTitleByLevel(safeLevel) : getTitleByLevel(1);

  const progresso = Math.max(
    0,
    Math.min(100, ((safeXp - (safeLevel - 1) * XP_PER_LEVEL) / XP_PER_LEVEL) * 100)
  );

  return (
    <div className="top-card card">
      <div className="dashboard-header">
        <div>
          <h2>🌱 EcoMente</h2>
          <p>Olá, <strong>{user?.name}</strong>!</p>
        </div>
        <button className="icon-btn" onClick={editUserName}>✏️</button>
      </div>
      <div className="nivel">Nível {safeLevel} - {nome}</div>
      <div className="barra"><div className="progresso" style={{ width: `${progresso}%` }} /></div>
      <p>📈 {Math.floor(progresso)}% para o próximo nível</p>
      <div className="stats-row">
        <div><strong>{user?.trees ?? 0}</strong><span>Árvores</span></div>
        <div><strong>{user?.recyclings ?? 0}</strong><span>Reciclagens</span></div>
        <div><strong>{user?.walks ?? 0}</strong><span>Caminhadas</span></div>
      </div>
    </div>
  );
}

