import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';
import { PitchesPage } from './PitchesPage';
export const Navbar = ({ user, login, getPitches, pitches }) => {
    
    return (
        <Router>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                <Link to="/"><h1 className="navbar-brand mb-0 h1">Home</h1></Link>
                    <div>
                        <Link to="/pitches"><button onClick={getPitches}>All Pitches</button></Link>                
                        <Link to="/login"><button onClick={login}>Login</button></Link>
                    </div>
                </div>
            </nav>
            
            <Switch>
                <Route path="/pitches"><PitchesPage pitches={pitches} user={user} /></Route>
                <Route path="/"><ProfilePage pitches={pitches} user={user} /></Route>
            </Switch>
        </Router>
    )
}