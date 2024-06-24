import React, { Component } from "react";
import UserService from "../services/crud/all.service";
import {Link} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            accessDeniedMessage: "",
            name: ""
        };
    }

    componentDidMount() {

        // Verifica se há uma mensagem de acesso negado passada via props.location.state
        const { location } = this.props;
        if (location && location.state && location.state.accessDeniedMessage) {
            this.setState({ accessDeniedMessage: location.state.accessDeniedMessage });
        }

        // Obtém o nome do usuário do localStorage, se estiver autenticado
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.setState({ name: user.name });
        }
    }

    render() {
        const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('user');

        const { name } = this.state;

        return (
            <div className="container">
                {this.state.accessDeniedMessage && (
                    <div className="alert alert-danger" role="alert">
                        {this.state.accessDeniedMessage}
                    </div>
                )}
                <header className="jumbotron">
                    {isAuthenticated ? (
                        <h3>Bem Vindo ao System ERP {name}</h3>
                    ) : (
                        <div>
                            <h3>Escolha Login ou Registe-se</h3>
                            <Link to="/login">
                                <button className="btn btn-primary-home">Login</button>
                            </Link>

                            <Link to="/register">
                                <button className="btn btn-secondary-home">Registe-se</button>
                            </Link>
                        </div>
                    )}
                </header>
            </div>
        );
    }
}
