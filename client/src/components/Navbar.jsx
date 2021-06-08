import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';


export default function Navbar() {
  const { loggedIn, admin } = useContext(AuthContext);

  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/pitches'>Pitches</Link>
      <Link to='/bookings'>Bookings</Link>
      {loggedIn === false && (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
      {admin === true && (
        <>
          <Link to='/createbooking'>Create booking</Link>
          <Link to='/bookingreq'>Booking Requests</Link>
          <Link to='/addpitch'>Add pitch</Link>
          <LogoutBtn />
        </>
      )}
      {loggedIn === true && admin === false && (
        <>
          <Link to='/mybookingreq'>My Requests</Link>
          <Link to='/mybookings'>My Bookings</Link>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}
