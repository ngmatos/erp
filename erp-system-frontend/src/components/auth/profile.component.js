// Profile.js

import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AllUsersService from "../../services/crud/users.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} , address: ""},
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({ redirect: "/" });
        } else {
            this.setState({
                currentUser: currentUser,
                userReady: true
            });
        }
    }


    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <div className="container">
                {this.state.userReady ? (
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>{currentUser.user.email}</strong> Profile
                            </h3>
                        </header>
                        <p>
                            <strong>Name:</strong>{" "}
                            {currentUser.user.name}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {currentUser.user.email}
                        </p>
                        <p>
                            <strong>Address:</strong>{" "}
                            {currentUser.user.address || 'Not available'}
                        </p>
                        <p>
                            <strong>Token:</strong>{" "}
                            {currentUser.token} ...{" "}
                        </p>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.user.authorities &&
                                currentUser.user.authorities.map((authority, index) => (
                                    <li key={index}>{authority.authority}</li>
                                ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}
