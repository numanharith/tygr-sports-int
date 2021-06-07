import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = { username, password };
      await axios.post('http://localhost:5000/api/auth/login', loginData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Log into your account</h1>
      <form onSubmit={login}>
        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
