import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required, email, vname, vpassword, vaddress } from "../helpers/validation";

import AuthService from "../services/auth.service";
import AllUsersService from "../services/crud/users.service";

export default class Orders extends Component {
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
            showEditModal: false,
            currentUserToEdit: {
                name: "",
                email: "",
                address: "",
                password: "",
            },
            error: false,
            errorMessage: "",
            successMessage: "", // Novo estado para mensagens de sucesso
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
                this.setState({ error: true, errorMessage: "Failed to load users. Please try again later." });
            });
    }

    // Função para abrir o modal de adicionar usuário
    openModal = () => {
        this.setState({ showModal: true, modalErrorMessage: "", successMessage: "" });
    }

    // Função para fechar o modal de adicionar usuário
    closeModal = () => {
        this.setState({ showModal: false, modalErrorMessage: "" });
    }

    openEditModal = user => {
        this.setState({
            showEditModal: true,
            currentUserToEdit: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: { roleName: user.role.roleName, roleId: user.role.roleId }
            },
            successMessage: ""
        });
    };

    closeEditModal = () => {
        this.setState({ showEditModal: false, currentUserToEdit: null });
    };

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
                    this.setState({ successMessage: "User added successfully!" });
                })
                .catch(error => {
                    console.error('Error adding user:', error);
                    this.setState({ modalErrorMessage: "Failed to add user. Please try again later." });
                });
        }
    }

    handleEditUserInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentUserToEdit: {
                ...prevState.currentUserToEdit,
                [name]: value
            }
        }));
    };

    handleEditUser = event => {
        event.preventDefault();
        const { currentUserToEdit } = this.state;
        AllUsersService.editUser(currentUserToEdit.id, {
            name: currentUserToEdit.name,
            email: currentUserToEdit.email,
            address: currentUserToEdit.address
        })
            .then(response => {
                console.log('User updated:', response);
                this.closeEditModal();
                this.loadAllUsers();
                this.setState({ successMessage: "User updated successfully!" });
            })
            .catch(error => {
                console.error('Error updating user:', error);
                this.setState({ modalErrorMessage: "Failed to update user. Please try again later." });
            });
    };

    handleDeleteUser = () => {
        const { currentUserToEdit } = this.state;

        if (window.confirm(`Are you sure you want to delete user ${currentUserToEdit.name}?`)) {
            AllUsersService.deleteUser(currentUserToEdit.id)
                .then(response => {
                    console.log('User deleted:', response);
                    this.closeEditModal();
                    this.loadAllUsers(); // Atualiza a lista de usuários após exclusão
                    this.setState({ successMessage: "User deleted successfully!" });
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    this.setState({ modalErrorMessage: "Failed to delete user. Please try again later." });
                });
        }
    }

    closeModalErrorMessage = () => {
        this.setState({ modalErrorMessage: "" });
    }

    // Função para fechar o alerta de erro
    closeErrorAlert = () => {
        this.setState({ error: false, errorMessage: "" });
    }

    // Função para fechar o alerta de sucesso
    closeSuccessAlert = () => {
        this.setState({ successMessage: "" });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        const { users, showModal, newUser, showEditModal, currentUserToEdit, error, errorMessage, successMessage, modalErrorMessage, accessDenied, accessDeniedMessage } = this.state;

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
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td onClick={() => this.openEditModal(user)} style={{ cursor: 'pointer', color: 'blue' }}>
                                            {user.name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.role.roleName} (ID: {user.role.roleId})</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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
                                                <Form
                                                    onSubmit={this.handleAddUser}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="name"
                                                            value={newUser.name}
                                                            onChange={this.handleInputChange}
                                                            validations={[required, vname]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="email"
                                                            value={newUser.email}
                                                            onChange={this.handleInputChange}
                                                            validations={[required, email]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="password">Password</label>
                                                        <Input
                                                            type="password"
                                                            className="form-control"
                                                            name="password"
                                                            value={newUser.password}
                                                            onChange={this.handleInputChange}
                                                            validations={[required, vpassword]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="address">Address</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="address"
                                                            value={newUser.address}
                                                            onChange={this.handleInputChange}
                                                            validations={[vaddress]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Save changes</button>
                                                    </div>

                                                    <CheckButton
                                                        style={{ display: "none" }}
                                                        ref={c => {
                                                            this.checkBtn = c;
                                                        }}
                                                    />
                                                </Form>
                                                {modalErrorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {modalErrorMessage}
                                                        <button type="button" className="close" onClick={this.closeModalErrorMessage}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
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
                            {/* Modal para editar usuário */}
                            {showEditModal && currentUserToEdit && (
                                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Edit User</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeEditModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <Form
                                                    onSubmit={this.handleEditUser}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="name"
                                                            value={currentUserToEdit.name}
                                                            onChange={this.handleEditUserInputChange}
                                                            validations={[required, vname]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="email"
                                                            value={currentUserToEdit.email}
                                                            onChange={this.handleEditUserInputChange}
                                                            validations={[required, email]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="address">Address</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="address"
                                                            value={currentUserToEdit.address}
                                                            onChange={this.handleEditUserInputChange}
                                                            validations={[vaddress]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="role">Role</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="role"
                                                            value={currentUserToEdit.role.roleName}
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Save changes
                                                        </button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-danger btn-block"
                                                                onClick={this.handleDeleteUser}>Delete User
                                                        </button>
                                                    </div>
                                                    <CheckButton
                                                        style={{display: "none"}}
                                                        ref={c => {
                                                            this.checkBtn = c;
                                                        }}
                                                    />
                                                </Form>
                                                {modalErrorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {modalErrorMessage}
                                                        <button type="button" className="close" onClick={this.closeModalErrorMessage}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={this.closeEditModal}>Close</button>
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
                            {/* Alerta de sucesso */}
                            {successMessage && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {successMessage}
                                    <button type="button" className="close" onClick={this.closeSuccessAlert}>
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
