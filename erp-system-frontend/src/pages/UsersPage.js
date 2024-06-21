// src/pages/HomePage.js
import React from 'react';
import Users from "../components/users.component";

const UsersPage = () => (
    <div>
        <h1>Users Page</h1>
        <p>Only for admins</p>
        <Users />
    </div>
);

export default UsersPage;
