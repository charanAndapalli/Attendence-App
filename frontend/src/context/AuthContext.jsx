import { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromToken, saveToken, clearToken } from '../utils/token';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken());
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { username, password });
      saveToken(data.token);
      setUser(getUserFromToken());
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => { clearToken(); setUser(null); };

  useEffect(() => { if (!user) clearToken(); }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
