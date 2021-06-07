import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext(null)

export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user)

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)