import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BookingCard from '../components/BookingCard';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const bookingsData = await axios.get('http://localhost:5000/api/bookings');
      setBookings(bookingsData.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <Container>
      <Row>
        {bookings.map((booking) => (
          <BookingCard booking={booking} key={booking._id} />
        ))}
      </Row>
    </Container>
  );
};

export default BookingsPage;
