import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Card, Alert, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const Pitch = ({ pitch }) => {
  const { admin } = useContext(AuthContext);

  // Admin deletes booking
  const deleteHandler = async (e) => {
    try {
      await axios.delete(`/api/pitches/delete/${pitch._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className='my-3 p-3 rounded pitch-card' key={pitch.id}>
      <Card.Img className='img' src={pitch.image} />

      <Card.Body>
        <Card.Title>{pitch.name}</Card.Title>

        <Card.Text as='div'>
          <div className='my-3'>
            {pitch.address}, {pitch.postalCode}
          </div>
        </Card.Text>

        {admin && (
          <form onSubmit={deleteHandler}>
            <Button type='submit' variant='danger'>
              Delete
            </Button>
          </form>
        )}
      </Card.Body>
    </Card>
  );
};

export const CreatePitchForm = ({ getPitches }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const addPitch = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'dpcju0f7');
      data.append('cloud_name', 'dxnyuudyt');
      await fetch('https://api.cloudinary.com/v1_1/dxnyuudyt/image/upload', { method: 'post', body: data })
        .then((res) => res.json())
        .then(({ url }) => axios.post('/api/pitches/', { name, address, postalCode, url }))
        .then(setSuccess(true))
        .catch((err) => console.log(err));
      history.push('/pitches');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {success && <Alert variant='success'>Pitch has been successfully added!</Alert>}
          <h1 className='form-header'>Create a Pitch</h1>
          <Form onSubmit={addPitch}>
            <Form.Group controlId='pitchName'>
              <Form.Label>Name of pitch</Form.Label>
              <Form.Control required type='text' placeholder='Name of pitch' onChange={(e) => setName(e.target.value)} value={name} />
            </Form.Group>
            <br></br>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control required type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
            </Form.Group>
            <br></br>
            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control required type='text' placeholder='Postal Code' onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
            </Form.Group>
            <br></br>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File required onChange={(e) => setImage(e.target.files[0])}></Form.File>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='success'>
              <i className='fas fa-plus'></i>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
