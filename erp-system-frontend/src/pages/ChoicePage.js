// src/pages/ChoicePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function ChoicePage() {
    return (
        <div>
            <p>localStorage.getItem('token'): {localStorage.getItem('token')}</p>
            <p>localStorage.getItem('isAuthenticated'): {localStorage.getItem('isAuthenticated')}</p>
            <h1>Choice Page</h1>
            <Link to="/signin">Sign In</Link>
            <br/>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default ChoicePage;
