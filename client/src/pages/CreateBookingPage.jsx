import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const CreateBookingPage = () => {
  const [pitches, setPitches] = useState([]);
  const [createBookingPitch, setCreateBookingPitch] = useState('');
  const [createBookingStart, setCreateBookingStart] = useState('');
  const [createBookingEnd, setCreateBookingEnd] = useState('');

  const getPitches = async () => {
    const pitchesRes = await axios.get('http://localhost:5000/api/pitches');
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
      await axios.post('http://localhost:5000/api/bookings/createbooking', createBookingData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPitches();
  }, []);

  return (
    <Fragment>
      <h1>Create a booking</h1>
      <form onSubmit={createBooking}>
        <select name='pitch' onChange={(e) => setCreateBookingPitch(e.target.value)} value={createBookingPitch}>
          <option value="" selected disabled hidden>Choose a pitch</option>
          {pitches.map((pitch) => {
            return <option value={pitch._id} key={pitch._id}>{pitch.name}</option>;
          })}
        </select>
        <input type='datetime-local' placeholder='Start time' onChange={(e) => setCreateBookingStart(e.target.value)} value={createBookingStart} />
        <input type='datetime-local' placeholder='End time' onChange={(e) => setCreateBookingEnd(e.target.value)} value={createBookingEnd} />
        <button type='submit'>Create booking</button>
      </form>
    </Fragment>
  );
};

export default CreateBookingPage;
