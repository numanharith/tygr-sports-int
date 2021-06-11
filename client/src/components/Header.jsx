import React, { Fragment, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

export default function Header() {
  const { loggedIn, admin } = useContext(AuthContext);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'><Navbar.Brand>TygrSports</Navbar.Brand></LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/pitches'><Nav.Link>Pitches</Nav.Link></LinkContainer>
              <LinkContainer to='/bookings'><Nav.Link>Bookings</Nav.Link></LinkContainer>
              {loggedIn === false && (
                <Fragment>
                  <LinkContainer to='/register'><Nav.Link>Register</Nav.Link></LinkContainer>
                  <LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer>
                </Fragment>
              )}
              {loggedIn && admin && (
                <Fragment>
                  <LinkContainer to='/createbooking'><Nav.Link>Create booking</Nav.Link></LinkContainer>
                  <LinkContainer to='/addpitch'><Nav.Link>Add pitch</Nav.Link></LinkContainer>
                  <LinkContainer to='/users'><Nav.Link>Users</Nav.Link></LinkContainer>
                </Fragment>
              )}
              {loggedIn && !admin && (
                <Fragment>
                  <LinkContainer to='/mybookings'><Nav.Link>My Bookings</Nav.Link></LinkContainer>
                  <LinkContainer to='/profile'><Nav.Link>Profile</Nav.Link></LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
          {loggedIn && (
            <Nav className='ml-auto'>
              <LogoutBtn />
            </Nav>
          )}
        </Container>
      </Navbar>
    </header>
  );
}
