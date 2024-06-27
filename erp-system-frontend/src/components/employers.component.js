import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required, email, vname, vpassword, vaddress } from "../helpers/validation";

import AuthService from "../services/auth.service";
import AllEmployersService from "../services/crud/employers.service";

export default class Employers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} },
            employers: [], // Estado para armazenar a lista de usuários
            showModal: false,
            newEmployer: {
                name: "",
                email: "",
                address: "",
                password: "",
            },
            showEditModal: false,
            currentEmployerToEdit: {
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
            if (!currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN") && !currentUser.user.authorities.some(auth => auth.authority === "ROLE_EMPLOYER")) {
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
                this.loadAllEmployers();
            }
        }
    }

    // Função para carregar todos os usuários usando AllUsersService
    loadAllEmployers() {
        AllEmployersService.getAllEmployers()
            .then(response => {
                this.setState({ employers: response });
            })
            .catch(error => {
                console.error('Error fetching all employers:', error);
                this.setState({ error: true, errorMessage: "Failed to load employers. Please try again later." });
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
            currentEmployerToEdit: {
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
        this.setState({ showEditModal: false, currentEmployerToEdit: null });
    };

    // Função para lidar com mudanças nos inputs do formulário de novo usuário
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newEmployer: {
                ...prevState.newEmployer,
                [name]: value
            }
        }));
    }

    // Função para adicionar novo usuário
    handleAddUser = event => {
        event.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const { name, email, address, password } = this.state.newEmployer;

            AllEmployersService.createEmployer({ name, email, address, password })
                .then(response => {
                    console.log('Employer added:', response);
                    this.closeModal();
                    this.loadAllEmployers();
                    this.setState({ successMessage: "Employer added successfully!" });
                })
                .catch(error => {
                    console.error('Error adding Employer:', error);
                    this.setState({ modalErrorMessage: "Failed to add Employer. Please try again later." });
                });
        }
    }

    handleEditUserInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentEmployerToEdit: {
                ...prevState.currentEmployerToEdit,
                [name]: value
            }
        }));
    };

    handleEditUser = event => {
        event.preventDefault();
        const { currentEmployerToEdit } = this.state;
        AllEmployersService.editEmployer(currentEmployerToEdit.id, {
            name: currentEmployerToEdit.name,
            email: currentEmployerToEdit.email,
            address: currentEmployerToEdit.address
        })
            .then(response => {
                console.log('Employer updated:', response);
                this.closeEditModal();
                this.loadAllEmployers();
                this.setState({ successMessage: "Employer updated successfully!" });
            })
            .catch(error => {
                console.error('Error updating Employer:', error);
                this.setState({ modalErrorMessage: "Failed to update Employer. Please try again later." });
            });
    };

    handleDeleteUser = () => {
        const { currentEmployerToEdit } = this.state;

        if (window.confirm(`Are you sure you want to delete user ${currentEmployerToEdit.name}?`)) {
            AllEmployersService.deleteEmployer(currentEmployerToEdit.id)
                .then(response => {
                    console.log('Employer deleted:', response);
                    this.closeEditModal();
                    this.loadAllEmployers(); // Atualiza a lista de usuários após exclusão
                    this.setState({ successMessage: "Employer deleted successfully!" });
                })
                .catch(error => {
                    console.error('Error deleting Employer:', error);
                    this.setState({ modalErrorMessage: "Failed to delete Employer. Please try again later." });
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

        const { employers, showModal, newEmployer, showEditModal, currentEmployerToEdit, error, errorMessage, successMessage, modalErrorMessage, accessDenied, accessDeniedMessage } = this.state;

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
                                    <strong>EMPLOYERS TABLE</strong>
                                </h3>
                                <button className="btn btn-primary" onClick={this.openModal}>
                                    Add Employer
                                </button>
                            </header>
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employers.map((user, index) => (
                                    <tr key={index}>
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
                                                <h3 className="modal-title">Add New User</h3>
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
                                                            value={newEmployer.name}
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
                                                            value={newEmployer.email}
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
                                                            value={newEmployer.password}
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
                                                            value={newEmployer.address}
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
                            {showEditModal && currentEmployerToEdit && (
                                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">Edit User</h3>
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
                                                            value={currentEmployerToEdit.name}
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
                                                            value={currentEmployerToEdit.email}
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
                                                            value={currentEmployerToEdit.address}
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
                                                            value={currentEmployerToEdit.role.roleName}
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Save changes
                                                        </button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-danger btn-block"
                                                                onClick={this.handleDeleteUser}>Delete Employer
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
