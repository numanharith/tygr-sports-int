import React, { useState, Fragment } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateProfileForm = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const history = useHistory();

  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'dpcju0f7');
      data.append('cloud_name', 'dxnyuudyt');

      await fetch('https://api.cloudinary.com/v1_1/dxnyuudyt/image/upload', { method: 'post', body: data })
        .then((res) => res.json())
        .then(({ url }) => axios.post('/api/profile/me', { height, weight, bio, url }))
        .catch((err) => console.log(err));
      history.push('/bookings');
    } catch (err) {
      console.error(err);
    }
  };  

  return (
    <Fragment>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1 className='form-header'>Create a Profile</h1>
          <Form onSubmit={createProfile}>
            <Form.Group controlId='height'>
              <Form.Label>Height</Form.Label>
              <Form.Control type='number' placeholder='Height in cm' value={height} onChange={(e) => setHeight(e.target.value)} />
            </Form.Group>
            <br></br>
            <Form.Group controlId='weight'>
              <Form.Label>Weight</Form.Label>
              <Form.Control type='number' placeholder='Weight in kg' value={weight} onChange={(e) => setWeight(e.target.value)} />
            </Form.Group>
            <br></br>
            <Form.Group controlId='bio'>
              <Form.Label>Bio</Form.Label>
              <Form.Control as='textarea' placeholder='Describe yourself!' value={bio} onChange={(e) => setBio(e.target.value)} />
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.File onChange={(e) => setImage(e.target.files[0])}></Form.File>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='primary'>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CreateProfileForm;
