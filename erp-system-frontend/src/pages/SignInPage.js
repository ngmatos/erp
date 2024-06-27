// src/pages/SignInPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Login from "../components/auth/login.component";

function SignInPage() {
    return (
        <div className="container">
            <h1>Sign In Page</h1>
            <Login/>
            <Link to="/">Back to Choice Page</Link>
        </div>
    );
}

export default SignInPage;
