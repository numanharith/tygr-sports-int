import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import CreateProfileForm from '../components/CreateProfileForm';

const ProfilePage = () => {
  const [existingProfile, setExistingProfile] = useState(false);

  const getProfile = async () => {
    try {
      const profile = await axios.get('http://localhost:5000/api/profile/me');
      if (profile.data !== null) {
        setExistingProfile(profile.data)
      } 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <Fragment>
      {existingProfile === false ? <CreateProfileForm /> :
        <div>
          <h1>{existingProfile.user.username}</h1>
          <p>{existingProfile.height}</p>
          <p>{existingProfile.weight}</p>
          <p>{existingProfile.bio}</p>
        </div>
      }
    </Fragment>
  )
};

export default ProfilePage;
