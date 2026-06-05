export default function ImpactPanel({ user, updateUserAction }) {
  const handleReset = () => {
    localStorage.removeItem('ecomente_user');
    window.location.reload();
  };

  return (
    <div className="card">
      <h3>🌎 Impacto</h3>
      <div className="impact-actions">
        <button className="btn" onClick={() => updateUserAction('addTree')}>
          <span>🌳 Plantar árvore</span>
          <span className="action-count">{user?.trees ?? 0}</span>
        </button>
        <button className="btn" onClick={() => updateUserAction('addRecycle')}>
          <span>♻️ Reciclar</span>
          <span className="action-count">{user?.recyclings ?? 0}</span>
        </button>
        <button className="btn" onClick={() => updateUserAction('addWalk')}>
          <span>🚶 Caminhar</span>
          <span className="action-count">{user?.walks ?? 0}</span>
        </button>
      </div>
      <button className="btn secondary" onClick={handleReset}>
        🔄 Reiniciar jogo local (perde o acesso ao seu progresso)
      </button>
    </div>
  );
}
