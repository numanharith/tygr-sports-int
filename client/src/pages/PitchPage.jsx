import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Pitch } from '../components/Pitch';
import AuthContext from '../context/AuthContext';
import { Col, Row } from 'react-bootstrap';

const PitchPage = () => {
  const [pitches, setPitches] = useState([]);

  const getPitches = async () => {
    try {
      const pitchesRes = await axios.get('/api/pitches');
      setPitches(pitchesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPitches();
  }, []);

  return (
    <div>
      <Row>
        {pitches.map((pitch) => (
          <Col key={pitch._id} sm={12} md={6} lg={4} xl={3}>
            <Pitch pitch={pitch} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PitchPage;
