// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    setLoading(false);
  }, []);

  const setUserSession = (userData) => {
    setUser(userData);
    localStorage.setItem('sessionUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('entradas');
    localStorage.removeItem('salidas');
  };

  return (
    <AuthContext.Provider value={{ user, setUserSession, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
