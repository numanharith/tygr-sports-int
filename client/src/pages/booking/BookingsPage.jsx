import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import BookingCard from '../../components/BookingCard';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const bookingsData = await axios.get('/api/bookings');
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
      {bookings === null ? (
        <Alert variant='info'>No bookings available</Alert>
      ) : (
      <Row>
        {bookings.map((booking) => (
          <Col key={booking._id} sm={12} md={6} lg={4} xl={3}>
            <BookingCard booking={booking} />
          </Col>
        ))}
      </Row>
      )}
    </Container>
  );
};

export default BookingsPage;
