import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PitchesPage from './pages/PitchesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/profile' component={ProfilePage} exact />
          <Route path='/pitches' component={PitchesPage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
