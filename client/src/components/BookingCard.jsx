import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import AuthContext from '../context/AuthContext';

const BookingCard = ({ booking }) => {
  const { loggedIn, admin } = useContext(AuthContext);
  const [booked, setBooked] = useState();

  // Convert MongoDB formatted datetime
  let date = moment(booking.start).format('ddd LL');
  let startTime = moment(booking.start).format('LT');
  let endTime = moment(booking.end).format('LT');

  const history = useHistory();

  // Checks if user has joined booking
  const joinedBooking = async () => {
    try {
      const { data } = await axios.get(`/api/bookings/${booking._id}`);
      if (data) {
        setBooked(true);
        console.log(`Line 25: booked is ${booked}`);
      } else {
        setBooked(false);
        console.log(`Line 28: booked is ${booked}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Admin deletes booking
  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/bookings/delete/${booking._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const clickHandler = async () => {
    if (booked) {
      try {
        setBooked(false);
        console.log(`Line 48: booked is ${booked}`);
        axios.put(`/api/bookings/cancel/${booking._id}`);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const { data } = await axios.get('/api/profile/hasprofile');
        if (data) {
          setBooked(true);
          console.log(`Line 58: booked is ${booked}`);
          axios.put(`/api/bookings/join/${booking._id}`);
          window.location.reload();
        } else {
          history.push('/profile');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    joinedBooking();
  }, []);

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
        {!admin && loggedIn && booking.users.length !== undefined && booking.users.length < 2 && (
          <Button onClick={clickHandler} variant={booked ? 'danger' : 'success'}>
            {booked ? 'Cancel' : 'Join'}
          </Button>
        )}
      </Card.Body>
      <Card.Footer>Players joined: {booking.users.length} / 2</Card.Footer>
    </Card>
  );
};

export default BookingCard;
