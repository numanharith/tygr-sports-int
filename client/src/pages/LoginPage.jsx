import React, { useContext, useState, Fragment } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { getLoggedIn, getAdmin } = useContext(AuthContext);

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = { username, password };
      await axios.post('http://localhost:5000/api/auth/login', loginData);
      await getLoggedIn();
      await getAdmin(); 
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <h1>Log into your account</h1>
      <form onSubmit={login}>
        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type='submit'>Login</button>
      </form>
    </Fragment>
  );
};

export default LoginPage;
