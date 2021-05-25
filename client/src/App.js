import './App.css';
import Axios from './utils/Axios';
import React from 'react';
import { Navbar } from './components/Navbar';

function App() {
  const [pitches, setPitches] = React.useState(null);
  const [user, setUser] = React.useState(null);

  async function login() {
    try {
        let { data } = await Axios.post('/api/login/', {
            username: 'numann',
            password: 'password',
        });

        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        // console.log(data);
        setUser(data);
    } catch (error) {
        console.log(error.response);
    }
  }

  async function getPitches() {
    try {
        let { data } = await Axios.get('/api/pitches/');
        // console.log(data);
        setPitches(data);
    } catch (error) {}
  }

  return (
    <div className='App'>
        <Navbar pitches={pitches} user={user} login={login} getPitches={getPitches} />
    </div>
  );
}

export default App;