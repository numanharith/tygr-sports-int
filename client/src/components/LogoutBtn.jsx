import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

const LogoutBtn = () => {
  const { getLoggedIn, getAdmin } = useContext(AuthContext);
  const history = useHistory();
  const logout = async () => {
    await axios.get('/api/auth/logout');
    await getLoggedIn();
    await getAdmin();
    history.push('/');
  };
  return <button onClick={logout}>Logout</button>;
};

export default LogoutBtn;
