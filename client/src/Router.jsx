import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingReqPage from './pages/BookingReqPage'
import PitchPage from './pages/PitchPage'
import CreateBookingPage from './pages/CreateBookingPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import { Container } from 'react-bootstrap'
import Footer from './components/Footer';
import { PitchForm } from './components/Pitch';
import MyBookingsPage from './pages/booking/MyBookingsPage';
import AllUsersPage from './pages/user/AllUsersPage';
import HomePage from './pages/HomePage';

export default function Router() {
  const { loggedIn, admin } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/pitches' component={PitchPage}></Route>
            <Route path='/bookings' component={BookingsPage}></Route>
            {admin === true &&  (
              <Fragment>
                <Route path='/createbooking' component={CreateBookingPage}></Route>
                <Route path='/addpitch' component={PitchForm}></Route>
                <Route path='/users' component={AllUsersPage}></Route>
              </Fragment>
            )}
            {loggedIn === false && (
              <Fragment>
                <Route path='/register' component={RegisterPage}></Route>
                <Route path='/login' component={LoginPage}></Route>
              </Fragment>
            )}
            {loggedIn === true && admin === false && (
              <Fragment>
                <Route path='/bookingreq' component={BookingReqPage}></Route>
                <Route path='/profile' component={ProfilePage}></Route>
                <Route path='/mybookings' component={MyBookingsPage}></Route>
              </Fragment>
            )}
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
