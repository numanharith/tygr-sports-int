import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import BookingCard from '../../components/BookingCard';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/mybookings');
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <Row>
        {bookings.map((booking) => (
          <Col key={booking._id} sm={12} md={6} lg={4} xl={3}>
            <BookingCard booking={booking} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyBookingsPage;
