import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Context API
import AuthContext from './context/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import { CreatePitchForm } from './components/Pitch';

// Pages
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import PitchPage from './pages/PitchPage';
import CreateBookingPage from './pages/booking/CreateBookingPage';
import BookingsPage from './pages/booking/BookingsPage';
import ProfilePage from './pages/profile/ProfilePage';
import MyBookingsPage from './pages/booking/MyBookingsPage';
import AllUsersPage from './pages/user/AllUsersPage';
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/profile/EditProfilePage';

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
            {admin === true && (
              <Fragment>
                <Route path='/createbooking' component={CreateBookingPage}></Route>
                <Route path='/addpitch' component={CreatePitchForm}></Route>
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
                <Route path='/profile' component={ProfilePage}></Route>
                <Route path='/mybookings' component={MyBookingsPage}></Route>
                <Route path='/editprofile' component={EditProfilePage}></Route>
              </Fragment>
            )}
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
