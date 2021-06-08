import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();
  
  const register = async (e) => {
    e.preventDefault();
    try {
      const registerData = { username, password, passwordVerify };
      await axios.post('http://localhost:5000/api/auth/', registerData);
      await getLoggedIn();
      history.pushState('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Register for a new account</h1>
      <form onSubmit={register}>
        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type='password' placeholder='Confirm password' onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify} />
        <button type='submit'>Register</button>
      </form>
    </>
  );
};

export default RegisterPage;
