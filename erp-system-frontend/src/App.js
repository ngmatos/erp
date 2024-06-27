import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Profile from "./components/auth/profile.component";
import UsersPage from "./pages/UsersPage";
import ClientsPage from "./pages/ClientsPage";
import EmployersPage from "./pages/EmployersPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import EventBus from "./common/EventBus";

class App extends Component {
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
        this.setState({
            currentUser: null,
        });
    };

    render() {
        return (
            <div id="root">
                <Header />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/clients" element={<ClientsPage />} />
                        <Route path="/employers" element={<EmployersPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        {/*Rest*/}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
