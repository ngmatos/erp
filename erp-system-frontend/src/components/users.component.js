import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import AllUsersService from "../services/crud/users.service";

// Funções de validação
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

// Endereço pode ser nulo ou vazio, mas se não for, deve ter entre 5 e 100 caracteres
const vaddress = value => {
    if (value && (value.length < 5 || value.length > 100)) {
        return (
            <div className="alert alert-danger" role="alert">
                The address must be between 5 and 100 characters.
            </div>
        );
    }
};

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} },
            users: [], // Estado para armazenar a lista de usuários
            showModal: false,
            newUser: {
                name: "",
                email: "",
                address: "",
                password: "",
            },
            error: false,
            errorMessage: "",
            modalErrorMessage: "", // Novo estado para mensagens de erro no modal
            accessDenied: false, // Estado para gerenciar o acesso negado
            accessDeniedMessage: "" // Mensagem de acesso negado
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({ redirect: "/" });
        } else {
            if (!currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN")) {
                this.setState({
                    redirect: "/",
                    accessDenied: true,
                    accessDeniedMessage: "You do not have access to this page."
                });
            } else {
                this.setState({
                    currentUser: currentUser,
                    userReady: true
                });

                // Carregar a lista de usuários após o componente montar
                this.loadAllUsers();
            }
        }
    }

    // Função para carregar todos os usuários usando AllUsersService
    loadAllUsers() {
        AllUsersService.getAllUsers()
            .then(response => {
                this.setState({ users: response });
            })
            .catch(error => {
                console.error('Error fetching all users:', error);
            });
    }

    // Função para abrir o modal de adicionar usuário
    openModal = () => {
        this.setState({ showModal: true, modalErrorMessage: "" });
    }

    // Função para fechar o modal de adicionar usuário
    closeModal = () => {
        this.setState({ showModal: false, modalErrorMessage: "" });
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
    handleAddUser = event => {
        event.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const { name, email, address, password } = this.state.newUser;

            AllUsersService.createUser({ name, email, address, password })
                .then(response => {
                    console.log('User added:', response);
                    this.closeModal();
                    this.loadAllUsers();
                })
                .catch(error => {
                    console.error('Error adding user:', error);
                    this.setState({ modalErrorMessage: "Failed to add user. Please try again later." });
                });
        }
    }

    // Função para fechar o alerta de erro
    closeErrorAlert = () => {
        this.setState({ error: false, errorMessage: "" });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        const { users, showModal, newUser, error, errorMessage, modalErrorMessage, accessDenied, accessDeniedMessage } = this.state;

        return (
            <div className="container">
                {accessDenied ? (
                    <div className="alert alert-danger" role="alert">
                        {accessDeniedMessage}
                    </div>
                ) : (
                    this.state.userReady && (
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
                            {/* Modal para adicionar novo usuário... */}
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
                                                <Form
                                                    onSubmit={this.handleAddUser}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    {/* Formulário para adicionar usuário... */}
                                                </Form>
                                                {modalErrorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {modalErrorMessage}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Alerta de erro... */}
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMessage}
                                    <button type="button" className="close" onClick={this.closeErrorAlert}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        );
    }
}