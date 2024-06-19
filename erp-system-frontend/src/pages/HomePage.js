// src/pages/HomePage.js
import React from 'react';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the ERP System!</p>
        {/*verifica ficheiros em localStorage e seus valores*/}
        <p>localStorage.getItem('token'): {localStorage.getItem('token')}</p>
        <p>localStorage.getItem('isAuthenticated'): {localStorage.getItem('isAuthenticated')}</p>
    </div>
);

export default HomePage;
