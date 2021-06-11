import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProfileForm from '../../components/profile/CreateProfileForm';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const [existingProfile, setExistingProfile] = useState(false);

  const getProfile = async () => {
    try {
      const profile = await axios.get('/api/profile/me');
      if (profile.data !== null) {
        setExistingProfile(profile.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container>
      {existingProfile === false ? (
        <CreateProfileForm />
      ) : (
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <Image src={existingProfile.imageUrl} alt={existingProfile.user.username} className='profile-img' roundedCircle />
            <h1>{existingProfile.user.username}</h1>
            <p>Height: {existingProfile.height}</p>
            <p>Weight: {existingProfile.weight}</p>
            <p>Bio: {existingProfile.bio}</p>
            <Link to={{ pathname: '/editprofile', state: { existingProfile } }}><Button type='submit' variant='warning'>Edit</Button></Link>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfilePage;
