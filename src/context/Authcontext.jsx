import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const defaultValue = null;
  const [token, setToken] = useState(() => {
    const savedData = localStorage.getItem('secure_scroll_accessToken');
    return savedData ? savedData : defaultValue;
  });

  useEffect(() => {
    // Save to localStorage whenever token changes
    localStorage.setItem('secure_scroll_accessToken', token || '');
  }, [token]);

  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('secure_scroll_accessToken');
    if (storedToken) {
      setToken(storedToken); // Ensure storedToken is a string
    }
  }, []); // This effect runs only once, on component mount

  const setAuthToken = (token) => {
    // Save token to localStorage and update state
    localStorage.setItem('secure_scroll_accessToken', token || '');
    setToken(token);
  };

  const removeAuthToken = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem('secure_scroll_accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, removeAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
