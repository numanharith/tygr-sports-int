import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../context/AuthContext';

const BookingCard = ({ booking }) => {
  const { loggedIn, admin } = useContext(AuthContext);
  const [userBooked, setUserBooked] = useState(false);

  // Convert MongoDB formatted datetime
  let date = moment(booking.start).format('ddd LL');
  let startTime = moment(booking.start).format('LT');
  let endTime = moment(booking.end).format('LT');

  const history = useHistory();

  // User joins a booking
  const joinHandler = async (e) => {
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

  // User cancels booking which they joined
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

  // Admin deletes booking
  const deleteHandler = async (e) => {
    // e.preventDefault();
    try {
      await axios.delete(`/api/bookings/delete/${booking._id}`);
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
  }, [joinedBooking]);

  return (
    <Card className='my-3 p-3 rounded booking-card'>
      <Card.Img variant='top img' src={booking.pitch.image} />
      <Card.Body>
        <Card.Title>{booking.pitch.name}</Card.Title>
        <Card.Subtitle>{date}</Card.Subtitle>
        <Card.Text>
          {startTime} - {endTime}
        </Card.Text>
        {admin && (
          <form onSubmit={deleteHandler}>
            <Button type='submit' variant='danger'>
              Delete
            </Button>
          </form>
        )}
        {!admin && loggedIn && booking.users.length !== undefined && booking.users.length < 2 && userBooked === false && (
          <form onSubmit={joinHandler}>
            <Button type='submit' variant='success'>
              Join
            </Button>
          </form>
        )}
        {!admin && booking.users.length !== undefined && booking.users.length < 2 && userBooked === true && (
          <form onSubmit={cancelHandler}>
            <Button type='submit' variant='danger'>
              Cancel
            </Button>
          </form>
        )}
      </Card.Body>
      <Card.Footer>Players joined: {booking.users.length} / 2</Card.Footer>
    </Card>
  );
};

export default BookingCard;
