export default function Dashboard({ user, editUserName }) {
  const calcularNivel = (pts) => {
    if (pts < 500) return { nivel: 1, nome: 'Eco Aprendiz', progresso: (pts / 500) * 100 };
    if (pts < 1000) return { nivel: 2, nome: 'Amigo da Terra', progresso: ((pts - 500) / 500) * 100 };
    if (pts < 1600) return { nivel: 3, nome: 'Protetor Verde', progresso: ((pts - 1000) / 600) * 100 };
    if (pts < 2200) return { nivel: 4, nome: 'Eco Guardião', progresso: ((pts - 1600) / 600) * 100 };
    return { nivel: 5, nome: 'Mestre Sustentável', progresso: Math.min(100, ((pts - 2200) / 800) * 100) };
  };

  const { nivel, nome, progresso } = calcularNivel(user?.points || 0);

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
