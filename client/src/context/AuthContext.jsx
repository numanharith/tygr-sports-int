import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [admin, setAdmin] = useState(false);

  const getAdmin = async() => {
    const res = await axios.get('/api/auth/admin');
    setAdmin(res.data)
  }

  const getLoggedIn = async () => {
    const res = await axios.get('/api/auth/loggedin');
    setLoggedIn(res.data);
  };

  useEffect(() => {
    getLoggedIn();
    getAdmin();
  }, []);

  return <AuthContext.Provider value={{ loggedIn, getLoggedIn, admin, getAdmin }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
