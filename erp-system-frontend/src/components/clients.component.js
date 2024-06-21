import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import AllUsersService from "../services/crud/users.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Invalid email format.
            </div>
        );
    }
};

const vname = value => {
    if (value.length < 3 || value.length > 100) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 100 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 8 || value.length > 100) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 100 characters.
            </div>
        );
    }
};

//address can be null or empty but if it is not, it must be between 5 and 100 characters
const vaddress = value => {
    if (value.length < 5 || value.length > 100) {
        return (
            <div className="alert alert-danger" role="alert">
                The address must be between 5 and 100 characters.
            </div>
        );
    }
}

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} },
            users: [], // Estado para armazenar a lista de usuários
            //Adicionar user atraves de um botao que aparece um form em popup
            showModal: false,
            newUser: {
                name: "",
                email: "",
                address: "",
                password: "",
            },
            error: false,
            errorMessage: ""
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

            // Carregar a lista de usuários após o componente montar
            this.loadAllUsers();
        }
    }

    // Função para carregar todos os usuários usando AllUsersService
    loadAllUsers() {
        AllUsersService.getAllUsers()
            .then(response => {
                this.setState({ users: response }); // Ajuste para acessar response.data
            })
            .catch(error => {
                console.error('Error fetching all users:', error);
            });
    }

    // Função para adicionar um novo usuário

    openModal = () => {
        this.setState({ showModal: true });
    }

    // Função para fechar o modal de adicionar usuário
    closeModal = () => {
        this.setState({ showModal: false });
    }

    // Função para lidar com mudanças nos inputs do formulário de novo usuário
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newUser: {
                ...prevState.newUser,
                [name]: value
            }
        }));
    }

    // Função para adicionar novo usuário
    handleAddUser = () => {
        const { name, email, address, password } = this.state.newUser;

        AllUsersService.createUser({ name, email, address, password })
            .then(response => {
                console.log('User added:', response);
                this.closeModal();
                this.loadAllUsers();
            })
            .catch(error => {
                console.error('Error adding user:', error);
                this.setState({ error: true, errorMessage: "Failed to add user. Please try again later." });
            });
    }

    closeErrorAlert = () => {
        this.setState({ error: false, errorMessage: "" });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { users, showModal, newUser, error, errorMessage } = this.state;

        return (
            <div className="container">
                {this.state.userReady ? (
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>USERS TABLE</strong>
                            </h3>
                            <button className="btn btn-primary" onClick={this.openModal}>
                                Add User
                            </button>
                        </header>
                        <strong>Users:</strong>
                        <ul>
                            {users.map((user, index) => (
                                <li key={index}>
                                    <strong>ID:</strong> {user.id}<br />
                                    <strong>Name:</strong> {user.name}<br />
                                    <strong>Email:</strong> {user.email}<br />
                                    <strong>Address:</strong> {user.address}<br />
                                    <strong>Role:</strong> {user.role.roleName} (ID: {user.role.roleId})
                                </li>
                            ))}
                        </ul>
                        {/* Modal para adicionar novo usuário */}
                        {showModal && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add New User</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" className="form-control" id="name" name="name" value={newUser.name} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={newUser.email} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Address</label>
                                                    <input type="text" className="form-control" id="address" name="address" value={newUser.address} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" className="form-control" id="password" name="password" value={newUser.password} onChange={this.handleInputChange} />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={this.handleAddUser}>Save changes</button>
                                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Alerta de erro */}
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {errorMessage}
                                <button type="button" className="close" onClick={this.closeErrorAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        );
    }
}
