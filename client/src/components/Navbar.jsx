import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/pitches'>Pitches</Link>
      {loggedIn === false && (
        <>
          <Link to='/register'>Register</Link>  
          <Link to='/login'>Login</Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Link to='/bookingreq'>My Requests</Link>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}
