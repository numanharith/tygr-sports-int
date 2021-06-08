import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ProfilePage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bio, setBio] = useState('');

  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const profileData = { height, weight, bio };
      console.log(profileData);
      await axios.post('http://localhost:5000/api/profile/me', profileData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Form onSubmit={createProfile}>
        <Form.Group controlId='height'>
          <Form.Label>Height</Form.Label>
          <Form.Control type='number' placeholder='Height in cm' value={height} onChange={(e) => setHeight(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='weight'>
          <Form.Label>Weight</Form.Label>
          <Form.Control type='number' placeholder='Weight in kg' value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='bio'>
          <Form.Label>Bio</Form.Label>
          <Form.Control as='textarea' placeholder='Describe yourself!' value={bio} onChange={(e) => setBio(e.target.value)} />
        </Form.Group>

        <Button type='submit' variant='primary'>Submit</Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
