import React, { useState, useEffect } from 'react';
import { useUser, UserProvider } from './contexts/UserContext';
import Dashboard from './components/Dashboard';
import MoodSelector from './components/MoodSelector';
import MissionCard from './components/MissionCard';
import Challenges from './components/Challenges';
import ImpactPanel from './components/ImpactPanel';
import Ranking from './components/Ranking';
import IAAssistant from './components/IAAssistant';
import Menu from './components/Menu';

function AppContent() {
  const { user, loading, editUserName, setMood, updateUserAction } = useUser();
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowNamePrompt(true);
    }
  }, [loading, user]);

  if (loading) return <div className="loading">Carregando...</div>;

  if (showNamePrompt) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value.trim();
      if (name) {
        await editUserName(name);
        setShowNamePrompt(false);
      }
    };

    return (
      <main className="page-center">
        <div className="card welcome-card">
          <h2>🌱 Bem-vindo ao EcoMente</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Seu nome" required />
            <button type="submit" className="btn">Iniciar jornada</button>
          </form>
        </div>
      </main>
    );
  }

  const handleEditName = async () => {
    const newName = prompt('Novo nome:', user?.name || '');
    if (newName?.trim()) {
      await editUserName(newName.trim());
    }
  };

  return (
    <>
      <main className="app-shell">
        <Dashboard user={user} editUserName={handleEditName} />
        <MoodSelector user={user} setMood={setMood} />
        <IAAssistant user={user} />
        <MissionCard user={user} updateUserAction={updateUserAction} />
        <Challenges user={user} updateUserAction={updateUserAction} />
        <ImpactPanel user={user} updateUserAction={updateUserAction} />
        <Ranking />
      </main>
      <Menu />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
