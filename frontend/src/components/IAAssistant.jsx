export default function IAAssistant({ user }) {
  const moodMessage = {
    feliz: 'Você está com energia positiva! Aproveite para reciclar algo hoje.',
    tranquilo: 'Hora de relaxar e cuidar do seu jardim interno.',
    neutro: 'Um pequeno gesto verde agora faz a diferença depois.',
    ansioso: 'Respire fundo e caminhe ao ar livre. Seu planeta agradece.',
    triste: 'Pequenas ações verdes podem melhorar seu humor. Vamos juntos.'
  };

  return (
    <div className="card assistant-card">
      <h3>🤖 Assistente EcoMente</h3>
      <p>{moodMessage[user?.mood] || 'Diga como está se sentindo para receber dicas especiais.'}</p>
      <div className="assistant-footer">
        <span>Humor atual:</span>
        <strong>{user?.mood || 'não definido'}</strong>
      </div>
    </div>
  );
}
