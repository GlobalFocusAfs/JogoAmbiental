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
          🌳 Plantar árvore (+15 pts)
        </button>
        <button className="btn" onClick={() => updateUserAction('addRecycle')}>
          ♻️ Reciclar (+10 pts)
        </button>
        <button className="btn" onClick={() => updateUserAction('addWalk')}>
          🚶 Caminhar (+12 pts)
        </button>
      </div>
      <button className="btn secondary" onClick={handleReset}>
        🔄 Reiniciar jogo local(perde o acesso ao seu progresso)
      </button>
    </div>
  );
}
