import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CreateBookingPage = () => {
  const [pitches, setPitches] = useState([]);
  const [createBookingPitch, setCreateBookingPitch] = useState('');
  const [createBookingStart, setCreateBookingStart] = useState('');
  const [createBookingEnd, setCreateBookingEnd] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const getPitches = async () => {
    const pitchesRes = await axios.get('/api/pitches');
    setPitches(pitchesRes.data);
  };

  const createBooking = async (e) => {
    e.preventDefault();
    try {
      const createBookingData = {
        pitch: createBookingPitch,
        start: createBookingStart,
        end: createBookingEnd,
      };
      await axios.post('/api/bookings/createbooking', createBookingData);
      setSuccess(true)
      history.push('/bookings');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPitches();
  }, []);

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
        {success && <Alert variant='success'>Booking successfully created!</Alert>}
          <h1 className='form-header'>Create a Booking</h1>
          <Form onSubmit={createBooking}>
            <Form.Group controlId='pitch'>
              <Form.Label>Pitch</Form.Label>
              <Form.Control required as='select' placeholder='Choose a pitch' onChange={(e) => setCreateBookingPitch(e.target.value)} value={createBookingPitch}>
                <option value="" defaultValue disabled hidden>Choose a pitch</option>
                {pitches.map((pitch) => {
                  return <option value={pitch._id} key={pitch._id}>{pitch.name}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <br></br>
            <Form.Group controlId='startTime'>
              <Form.Label>Start Time</Form.Label>
              <Form.Control required type='datetime-local' placeholder='Start time' onChange={(e) => setCreateBookingStart(e.target.value)} value={createBookingStart} />
            </Form.Group>
            <br></br>
            <Form.Group controlId='endTime'>
              <Form.Label>End Time</Form.Label>
              <Form.Control required type='datetime-local' placeholder='End time' onChange={(e) => setCreateBookingEnd(e.target.value)} value={createBookingEnd} />
            </Form.Group>
            <br></br>
            <Button type='submit' variant='success'>Submit <i className="fas fa-calendar-day"></i></Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBookingPage;
