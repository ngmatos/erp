// src/pages/SignInPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';

function SignInPage() {
    return (
        <div>
            <h1>Sign In Page</h1>
            <SignIn />
            <Link to="/">Back to Choice Page</Link>
        </div>
    );
}

export default SignInPage;
