import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PitchForm, Pitch } from '../components/Pitch';
import AuthContext from '../context/AuthContext';

const PitchPage = () => {
  const { admin } = useContext(AuthContext);

  const [pitches, setPitches] = useState([]);

  const getPitches = async () => {
    const pitchesRes = await axios.get('http://localhost:5000/api/pitches');
    setPitches(pitchesRes.data);
  };

  useEffect(() => {
    getPitches();
  }, []);

  return (
    <>
      {admin === true && (
        <PitchForm pitches={pitches} getPitches={getPitches} />
      )}
      <div>
        <Pitch pitches={pitches} />
      </div>
    </>
  );
};

export default PitchPage;
