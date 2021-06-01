import React from 'react';
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>TygrSports</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to='/play'>
                <Nav.Link><i className="fas fa-futbol"></i>Play</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/pitches'>
                <Nav.Link><i className="fas fa-map-marked"></i>Pitches</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;