import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'><div>Home</div></Route>
        <Route path='/register'><RegisterPage /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/bookingreq'><div>Booking Requests</div></Route>
      </Switch>
    </BrowserRouter>
  )
}
