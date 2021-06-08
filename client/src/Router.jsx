import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingReqPage from './pages/BookingReqPage'
import PitchPage from './pages/PitchPage'
import CreateBookingPage from './pages/CreateBookingPage';
import BookingsPage from './pages/BookingsPage';


export default function Router() {
  const { loggedIn, admin } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'><div>Home</div></Route>
        <Route path='/pitches'><PitchPage /></Route>
        <Route path='/bookings'><BookingsPage /></Route>
        {loggedIn === false && (
          <>
            <Route path='/register'><RegisterPage /></Route>
            <Route path='/login'><LoginPage /></Route>
          </>
        )}
        {admin === true && (
            <Route path='/createbooking'><CreateBookingPage /></Route>
        )}
        {loggedIn === true && (
          <>
            <Route path='/bookingreq'><BookingReqPage /></Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  )
}
