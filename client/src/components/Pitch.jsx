import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Pitch = ({ pitch }) => {
  return (
    <Card className='my-3 p-3 rounded pitch-card' key={pitch.id}>
      <Link to='/'>
        <Card.Img className='pitch-img' src={pitch.image} />
      </Link>

      <Card.Body>
        <Link to={'/'}>
          <Card.Title as='div'>
            <strong>{pitch.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            {pitch.address}, {pitch.postalCode}
          </div>
        </Card.Text>

        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
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
      await axios.post('/api/pitches', addPitchData);
      getPitches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <h1>Create a Pitch</h1>
      <form onSubmit={addPitch}>
        <input type='text' placeholder='Name of pitch' onChange={(e) => setName(e.target.value)} value={name} />
        <input type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
        <input type='text' placeholder='Postal Code' onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
        <input type='text' placeholder='Image URL' onChange={(e) => setImage(e.target.value)} value={image} />
        <button type='submit'>Add Pitch</button>
      </form>
    </Fragment>
  );
};
