import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PitchForm, Pitch } from '../components/Pitch';
import AuthContext from '../context/AuthContext';
import { Container, Row } from 'react-bootstrap';

const PitchPage = () => {
  const { admin } = useContext(AuthContext);

  const [pitches, setPitches] = useState([]);

  const getPitches = async () => {
    try {
      const pitchesRes = await axios.get('http://localhost:5000/api/pitches');
      setPitches(pitchesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPitches();
  }, []);

  return (
    <>
      {admin === true && <PitchForm pitches={pitches} getPitches={getPitches} />}
      <Container>
        <Row>
          {pitches.map((pitch) => (
            <Pitch pitch={pitch} key={pitch._id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default PitchPage;
