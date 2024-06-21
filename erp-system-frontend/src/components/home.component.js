import React, { Component } from "react";
import UserService from "../services/crud/all.service";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            accessDeniedMessage: "" // Estado para armazenar a mensagem de acesso negado
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content: (error.response && error.response.data) || error.message || error.toString()
                });
            }
        );

        // Verifica se há uma mensagem de acesso negado passada via props.location.state
        const { location } = this.props;
        if (location && location.state && location.state.accessDeniedMessage) {
            this.setState({ accessDeniedMessage: location.state.accessDeniedMessage });
        }
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Home</h3>
                    <h3>token = {localStorage.getItem('token') ? "true" : "false"}</h3>
                    <h3>user = {localStorage.getItem('user') ? "true" : "false"}</h3>
                    {this.state.accessDeniedMessage && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.accessDeniedMessage}
                        </div>
                    )}
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
