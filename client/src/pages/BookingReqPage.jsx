import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BookingReqForm, BookingReqsList } from '../components/BookingReq';

const BookingReqPage = () => {
  const [bookingReqs, setBookingReqs] = useState([]);

  const getBookingReqs = async () => {
    const bookingReqsRes = await axios.get('http://localhost:5000/api/bookingreq');
    setBookingReqs(bookingReqsRes.data);
  };

  useEffect(() => {
    getBookingReqs();
  }, []);

  return (
    <div>
      <BookingReqForm getBookingReqs={getBookingReqs} />
      <BookingReqsList bookingReqs={bookingReqs} />
      </div>
  );
};

export default BookingReqPage;
