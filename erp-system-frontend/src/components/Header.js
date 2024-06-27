import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    componentDidMount() {
        EventBus.on("logout", this.logOut);
    }

    componentWillUnmount() {
        EventBus.remove("logout", this.logOut);
    }

    logOut = () => {
        AuthService.logout();
        this.setState({ currentUser: null });
    };

    render() {
        const { currentUser } = this.state;

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    ERP SYSTEM
                </Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>
                    </li>

                    {currentUser && (
                        <>

                            {/* Role Employer */}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_EMPLOYER") && (
                                <li className="nav-item">
                                    <Link to="/clients" className="nav-link">
                                        Clients
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_EMPLOYER") && (
                                <li className="nav-item">
                                    <Link to="/employers" className="nav-link">
                                        Employers
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_EMPLOYER") && (
                                <li className="nav-item">
                                    <Link to="/orders" className="nav-link">
                                        Orders
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_EMPLOYER") && (
                                <li className="nav-item">
                                    <Link to="/products" className="nav-link">
                                        Products
                                    </Link>
                                </li>
                            )}

                            {/* Role Admin */}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN") && (
                                <li className="nav-item">
                                    <Link to="/users" className="nav-link">
                                        Users
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN") && (
                                <li className="nav-item">
                                    <Link to="/clients" className="nav-link">
                                        Clients
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN") && (
                                <li className="nav-item">
                                    <Link to="/employers" className="nav-link">
                                        Employers
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN") && (
                                <li className="nav-item">
                                    <Link to="/orders" className="nav-link">
                                        Orders
                                    </Link>
                                </li>
                            )}
                            {currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN") && (
                                <li className="nav-item">
                                    <Link to="/products" className="nav-link">
                                        Products
                                    </Link>
                                </li>
                            )}
                        </>
                    )}
                </ul>

                <div className="navbar-nav ml-auto">
                    {currentUser ? (
                        <>
                        <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    {currentUser.user.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </div>
            </nav>
        );
    }
}

export default Header;
