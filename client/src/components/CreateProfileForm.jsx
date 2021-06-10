import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateProfileForm = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  // const [image, setImage] = useState('');
  // const [imageUrl, setImageUrl] = useState('');
  const [bio, setBio] = useState('');

  const createProfile = async (e) => {
    // const data = new FormData();
    // data.append('file', image);
    // data.append('upload_preset', 'dpcju0f7');
    // data.append('cloud_name', 'dxnyuudyt');
    // await setImageUrl('initiate');
    // await console.log(imageUrl);
    // await fetch('https://api.cloudinary.com/v1_1/dxnyuudyt/image/upload', { method: 'post', body: data })
    //   .then((res) => res.json())
    //   .then(({ url }) => console.log(url))
    //   .catch((err) => console.log(err));
    
    const profileData = { height, weight, bio };
    await axios.post('/api/profile/me', profileData);
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

        {/* <Form.Group>
          <Form.Label>Avatar</Form.Label>
          <Form.File onChange={(e) => setImage(e.target.files[0])}></Form.File>
        </Form.Group> */}

        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateProfileForm;
