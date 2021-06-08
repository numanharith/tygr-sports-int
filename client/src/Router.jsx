import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingReqPage from './pages/BookingReqPage'
import PitchPage from './pages/PitchPage'

export default function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'><div>Home</div></Route>
        <Route path='/pitches'><PitchPage /></Route>
        {loggedIn === false && (
          <>
            <Route path='/register'><RegisterPage /></Route>
            <Route path='/login'><LoginPage /></Route>
          </>
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
