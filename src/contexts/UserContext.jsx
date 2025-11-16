import React, { createContext, useState, useEffect } from 'react';

// Context para mantener la sesión del usuario activo
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isLoggedIn: false,
  logout: () => {}
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Sincronizar con localStorage cuando cambia el usuario
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    setCurrentUser,
    isLoggedIn: !!currentUser,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
