import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Card, Button } from 'react-bootstrap';
import moment from 'moment';

const BookingCard = ({ booking }) => {
  // Convert MongoDB formatted datetime
  let startDate = moment(booking.start).format('LLLL');
  let endDate = moment(booking.end).format('LLLL');

  const joinHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(booking._id)
      await axios.put(`http://localhost:5000/api/bookings/join/${booking._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Col>
      <Card.Img variant='top' src={booking.pitch.image} />
      <Card.Body>
        <Card.Title>{booking.pitch.name}</Card.Title>
        <Card.Text>Starts: {startDate}</Card.Text>
        <Card.Text>Ends: {endDate}</Card.Text>
        <form onSubmit={joinHandler }>
          <button type='submit'>Join</button>
        </form>
      </Card.Body>
    </Col>
  );
};

export default BookingCard;
