import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Alert, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');

  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();
    try {
      const registerData = { username, password, passwordVerify };
      await axios.post('/api/auth/', registerData);
      await getLoggedIn();
      history.push('/');
    } catch (err) {
      setError(err.response.data.errorMessage);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {error && <Alert variant='danger'>{error}</Alert>}
          <h1 className='form-header'>Register for a new account</h1>
          <Form onSubmit={register}>
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
            <Form.Group controlId='passwordVerify'>
              <Form.Label>Cornfirm Password</Form.Label>
              <Form.Control required type='password' placeholder='Confirm password' onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify}></Form.Control>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='primary'>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
