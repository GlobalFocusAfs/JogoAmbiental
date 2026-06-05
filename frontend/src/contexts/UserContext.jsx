import React, { createContext, useState, useContext, useEffect } from 'react';
import { initUser, sendAction, updateMood } from '../api';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async (name) => {
    setLoading(true);
    try {
      const { data } = await initUser(name);
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserAction = async (actionType, extra = {}) => {
    if (!user) return;
    try {
      const { data } = await sendAction(user.name, actionType, extra);
      setUser(data);
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao executar ação');
    }
  };

  const setMood = async (mood) => {
    if (!user) return;
    try {
      const { data } = await updateMood(user.name, mood);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const editUserName = async (newName) => {
    if (!newName) return;
    localStorage.setItem('ecomente_user', newName);
    await loadUser(newName);
  };

  useEffect(() => {
    const savedName = localStorage.getItem('ecomente_user');
    if (savedName) {
      loadUser(savedName);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUserAction, setMood, editUserName }}>
      {children}
    </UserContext.Provider>
  );
};
