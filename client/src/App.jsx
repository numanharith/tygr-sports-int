import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthProvider from './AuthContext';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  const user = localStorage.getItem('user');

  return (
    <AuthProvider user={user}>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />

          <ProtectedRoute exact path='/'>
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile'>
            <Profile />
          </ProtectedRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
