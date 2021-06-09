import axios from 'axios';
import React, { useState } from 'react';

export const BookingReqForm = ({ getBookingReqs }) => {
  const [bookingReqPitch, setBookingReqPitch] = useState('');

  const registerInterest = async (e) => {
    e.preventDefault();
    try {
      const bookingReqData = {
        pitch: bookingReqPitch,
      };
      await axios.post('/api/bookingreq', bookingReqData);
      getBookingReqs();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={registerInterest}>
      <input type='text' placeholder='Pitch' onChange={(e) => setBookingReqPitch(e.target.value)} value={bookingReqPitch} />
      <button type='submit'>Register interest</button>
    </form>
  );
};

export const BookingReqsList = ({ bookingReqs }) => {
  const renderBookingReq = () => {
    return bookingReqs.map((bookingReq) => {
      return <li key={bookingReq._id}>{bookingReq.pitch}</li>;
    });
  };

  return (
    <div>
      <ul>{renderBookingReq()}</ul>
    </div>
  );
};
