import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';

const LogoutBtn = () => {
  const { getLoggedIn, getAdmin } = useContext(AuthContext);
  const history = useHistory();
  const logout = async () => {
    await axios.get('/api/auth/logout');
    history.push('/');
    await getLoggedIn();
    await getAdmin();
  };
  return <Button variant='dark' onClick={logout}>Logout</Button>;
};

export default LogoutBtn;
