import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeePage from "./pages/EmployeePage";

const App = () => {
    return (
        <Router>
            <div>
                {/*<Header />*/}
                <Routes>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/employees" component={EmployeePage} />
                    {/* Add routes for other pages as needed */}
                </Routes>
                {/*<Footer />*/}
            </div>
        </Router>
    );
}

export default App;
