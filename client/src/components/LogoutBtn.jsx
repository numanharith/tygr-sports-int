import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

const LogoutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const logout = async () => {
    await axios.get('http://localhost:5000/api/auth/logout');
    await getLoggedIn();
    history.push('/');
  };
  return <button onClick={logout}>Logout</button>;
};

export default LogoutBtn;
