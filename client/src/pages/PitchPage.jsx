import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PitchForm, Pitch } from '../components/Pitch';

const PitchPage = () => {
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
      <PitchForm pitches={pitches} getPitches={getPitches} />
      <div>
        <Pitch pitches={pitches}/>
      </div>
    </>
  );
};

export default PitchPage;
