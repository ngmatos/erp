import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/employees">Employees</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/stock">Stock</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
