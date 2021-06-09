import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {  Card } from 'react-bootstrap';
import moment from 'moment';
import AuthContext from '../context/AuthContext';

const BookingCard = ({ booking }) => {
  const { loggedIn, admin } = useContext(AuthContext);
  const [userBooked, setUserBooked] = useState(false);
  

  // Convert MongoDB formatted datetime
  let startDate = moment(booking.start).format('LLLL');
  let endDate = moment(booking.end).format('LLLL');

  const joinHandler = async (e) => {
    try {
      await axios.put(`/bookings/join/${booking._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // const cancelHandler = async (e) => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/bookings/join/${booking._id}`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
    if (loggedIn === true) {
      joinedBooking();
    } else {
      return null;
    }
  },[]);

  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Img variant='top' src={booking.pitch.image} />
      <Card.Body>
        <Card.Title>{booking.pitch.name}</Card.Title>
        <Card.Text>Starts: {startDate}</Card.Text>
        <Card.Text>Ends: {endDate}</Card.Text>
        <Card.Text>{booking.users.length} / 2</Card.Text>
        {!admin && loggedIn && booking.users.length !== undefined && booking.users.length < 2 && userBooked === false && (
          <form onSubmit={joinHandler}>
            <button type='submit'>Join</button>
          </form>
        )}
        {/* {!admin && booking.users.length !== undefined && booking.users.length < 2 && userBooked === true && (
          <form onSubmit={cancelHandler}>
            <button type='submit'>Cancel</button>
          </form>
        )} */}
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
