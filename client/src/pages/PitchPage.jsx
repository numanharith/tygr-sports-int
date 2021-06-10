import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pitch } from '../components/Pitch';
import { Col, Row } from 'react-bootstrap';

const PitchPage = () => {
  const [pitches, setPitches] = useState([]);

  const getPitches = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/pitches');
      setPitches(data);
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
