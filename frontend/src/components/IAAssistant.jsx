export default function IAAssistant({ user }) {
  const moodToSuggestion = {
    feliz: {
      text: 'Você está com energia positiva! Tente concluir a Missão do Dia hoje: cuide de uma planta ou faça algo verde.',
      actionType: 'completeMission',
    },
    tranquilo: {
      text: 'Hora de relaxar e cuidar do seu jardim interno. Sua Missão do Dia também pode ser um gesto de bem-estar.',
      actionType: 'completeMission',
    },
    neutro: {
      text: 'Um pequeno gesto verde agora faz a diferença depois. Que tal concluir a Missão do Dia?',
      actionType: 'completeMission',
    },
    ansioso: {
      text: 'Respire fundo e caminhe ao ar livre. Conclua a Missão do Dia para ganhar XP e fortalecer o hábito.',
      actionType: 'completeMission',
    },
    triste: {
      text: 'Pequenas ações verdes podem melhorar seu humor. Conclua a Missão do Dia com carinho.',
      actionType: 'completeMission',
    },
  };

  const suggestion = moodToSuggestion[user?.mood] || {
    text: 'Diga como está se sentindo para receber uma missão sugerida.',
    actionType: 'completeMission',
  };

  return (
    <div className="card assistant-card">
      <h3>🤖 Assistente EcoMente</h3>
      <p>{suggestion.text}</p>
      <div className="assistant-footer">
        <span>Humor atual:</span>
        <strong>{user?.mood || 'não definido'}</strong>
      </div>
      <div className="assistant-footer">
        <span>Missão sugerida:</span>
        <strong>Missão do Dia</strong>
      </div>
    </div>
  );
}

