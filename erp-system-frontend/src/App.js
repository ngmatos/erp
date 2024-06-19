// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChoicePage from './pages/ChoicePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importa o contexto de autenticação

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={ChoicePage} /> {/* Página de escolha acessível a todos */}
                    <Route path="/signup" component={SignUpPage} /> {/* Página de registro acessível a todos */}
                    <Route path="/signin" component={SignInPage} /> {/* Página de login acessível a todos */}
                    <PrivateRoute path="/homepage" component={HomePage} /> {/* Página inicial acessível apenas para autenticados */}
                    <Redirect to="/" /> {/* Redireciona URLs desconhecidas para a página de escolha */}
                </Switch>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    const { state } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                state.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}

export default App;
