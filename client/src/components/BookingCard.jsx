import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

const BookingCard = ({ booking }) => {
  const { loggedIn, admin } = useContext(AuthContext);
  const [userBooked, setUserBooked] = useState(false);
  

  // Convert MongoDB formatted datetime
  let startDate = moment(booking.start).format('LLLL');
  let endDate = moment(booking.end).format('LLLL');

  const history = useHistory();
  const joinHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get('/api/profile/hasprofile');
      if (data) {
        await axios.put(`/api/bookings/join/${booking._id}`);
      } else {
        history.push('/profile');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelHandler = async (e) => {
    try {
      await axios.put(`/api/bookings/cancel/${booking._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Checks if user has joined booking
  const joinedBooking = async () => {
    try {
      const { data } = await axios.get(`/api/bookings/${booking._id}`);
      if (data === true) setUserBooked(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loggedIn === true && admin === false) {
      joinedBooking();
    } else {
      return null;
    }
  },[joinedBooking]);

  return (
    <Card className='my-3 p-3 rounded booking-card'>
      <Card.Img variant='top img' src={booking.pitch.image} />
      <Card.Body>
        <Card.Title>{booking.pitch.name}</Card.Title>
        <Card.Text>Starts: {startDate}</Card.Text>
        <Card.Text>Ends: {endDate}</Card.Text>
        <Card.Text>Players joined: {booking.users.length} / 2</Card.Text>
        {!admin && loggedIn && booking.users.length !== undefined && booking.users.length < 2 && userBooked === false && (
          <form onSubmit={joinHandler}>
            <Button type='submit' variant="success">Join</Button>
          </form>
        )}
        {!admin && booking.users.length !== undefined && booking.users.length < 2 && userBooked === true && (
          <form onSubmit={cancelHandler}>
            <Button type='submit' variant="danger">Cancel</Button>
          </form>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
