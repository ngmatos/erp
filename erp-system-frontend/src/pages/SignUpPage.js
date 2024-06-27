// src/pages/SignUpPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Register from "../components/auth/register.component";

function SignUpPage() {
    return (
        <div className="container">
            <h1>Sign Up Page</h1>
            <Register/>
            <Link to="/">Back to Choice Page</Link>
        </div>
    );
}

export default SignUpPage;
