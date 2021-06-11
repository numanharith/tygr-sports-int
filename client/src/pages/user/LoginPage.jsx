import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Alert, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { getLoggedIn, getAdmin } = useContext(AuthContext);

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = { username, password };
      await axios.post('/api/auth/login', loginData);
      history.push('/');
      await getLoggedIn();
      await getAdmin(); 
    } catch (err) {
      setError(err.response.data.errorMessage);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {error && <Alert variant='danger'>{error}</Alert>}
          <h1 className='form-header'>Log into your account</h1>
          <Form onSubmit={login}>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control required type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}></Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control required type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}></Form.Control>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='primary'>Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
