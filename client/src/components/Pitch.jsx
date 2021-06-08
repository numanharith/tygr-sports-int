import React, { useState } from 'react';
import axios from 'axios';
import { Col, Card } from 'react-bootstrap';

export const Pitch = ({ pitch }) => {
  return (
    <Col>
      <Card.Img variant='top' src={pitch.image} />
      <Card.Body>
        <Card.Title>{pitch.name}</Card.Title>
        <Card.Text>{pitch.address}</Card.Text>
        <Card.Text>{pitch.postalCode}</Card.Text>
      </Card.Body>
    </Col>
  );
};

export const PitchForm = ({ getPitches }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [image, setImage] = useState('');

  const addPitch = async (e) => {
    e.preventDefault();
    try {
      const addPitchData = { name, address, postalCode, image };
      await axios.post('http://localhost:5000/api/pitches', addPitchData);
      getPitches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Create a Pitch</h1>
      <form onSubmit={addPitch}>
        <input type='text' placeholder='Name of pitch' onChange={(e) => setName(e.target.value)} value={name} />
        <input type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
        <input type='text' placeholder='Postal Code' onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
        <input type='text' placeholder='Image URL' onChange={(e) => setImage(e.target.value)} value={image} />
        <button type='submit'>Add Pitch</button>
      </form>
    </>
  );
};
