// src/pages/SignUpPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../components/auth/SignUp';

function SignUpPage() {
    return (
        <div>
            <h1>Sign Up Page</h1>
            <SignUp />
            <Link to="/">Back to Choice Page</Link>
        </div>
    );
}

export default SignUpPage;
