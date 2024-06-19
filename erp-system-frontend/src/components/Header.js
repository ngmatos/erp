import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="React Logo" />
            <h1 className="App-title">
                <Link className="App-title" to="/">ERP</Link>
            </h1>
            <nav>
                <ul className="nav">
                    <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {/* Adicione mais links aqui conforme necessário */}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
