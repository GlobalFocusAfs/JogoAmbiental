export default function ImpactPanel({ user, updateUserAction }) {
  const handleReset = () => {
    localStorage.removeItem('ecomente_user');
    window.location.reload();
  };

  const today = new Date().toDateString();
  const impact = user?.impact;
  const isToday = impact?.date === today;

  const usedTrees = (isToday ? impact?.treesMarked : 0) || 0;
  const usedRecycles = (isToday ? impact?.recyclesMarked : 0) || 0;
  const usedWalks = (isToday ? impact?.walksMarked : 0) || 0;

  const limit = 5;

  return (
    <div className="card">
      <h3>🌎 Impacto</h3>
      <div className="impact-actions">
        <button
          className="btn"
          onClick={() => updateUserAction('addTree')}
          disabled={usedTrees >= limit}
        >
          <span>🌳 Plantar árvore</span>
          <span className="action-count">{user?.trees ?? 0}</span>
          <span className="action-count">({usedTrees}/{limit})</span>
        </button>
        <button
          className="btn"
          onClick={() => updateUserAction('addRecycle')}
          disabled={usedRecycles >= limit}
        >
          <span>♻️ Reciclar</span>
          <span className="action-count">{user?.recyclings ?? 0}</span>
          <span className="action-count">({usedRecycles}/{limit})</span>
        </button>
        <button
          className="btn"
          onClick={() => updateUserAction('addWalk')}
          disabled={usedWalks >= limit}
        >
          <span>🚶 Caminhar</span>
          <span className="action-count">{user?.walks ?? 0}</span>
          <span className="action-count">({usedWalks}/{limit})</span>
        </button>
      </div>
      <button className="btn secondary" onClick={handleReset}>
        🔄 Reiniciar jogo local (perde o acesso ao seu progresso)
      </button>
    </div>
  );
}

