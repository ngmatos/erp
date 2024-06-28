import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import AllUsersService from "../../services/crud/users.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {}, address: "" },
            editMode: false,
            editPassword: false,
            formData: {
                name: "",
                email: "",
                address: "",
                role: { roleName: "", roleId: "" }
            },
            formPassword: {
                oldPassword: "",
                password: "",
                passwordConfirm: ""
            },
            passwordError: "",
            successMessage: "", // Novo estado para mensagens de sucesso
            errorMessage: ""    // Novo estado para mensagens de erro
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({ redirect: "/" });
        } else {
            this.setState({
                currentUser: currentUser,
                userReady: true,
                formData: {
                    name: currentUser.user.name,
                    email: currentUser.user.email,
                    address: currentUser.user.address || "",
                    role: { roleName: currentUser.user.role.roleName, roleId: currentUser.user.role.roleId }
                }
            });
        }
    }

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    togglePasswordMode = () => {
        this.setState({ editPassword: !this.state.editPassword });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            formData: { ...this.state.formData, [name]: value }
        });
    }

    handlePasswordChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            formPassword: { ...this.state.formPassword, [name]: value }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { formData } = this.state;
        AllUsersService.editCurrentUser({
            name: formData.name,
            email: formData.email,
            address: formData.address
        })
            .then(response => {
                const updatedUser = response;
                this.setState({
                    currentUser: {
                        ...this.state.currentUser,
                        user: updatedUser
                    },
                    formData: {
                        name: updatedUser.name,
                        email: updatedUser.email,
                        address: updatedUser.address,
                        role: updatedUser.role
                    },
                    editMode: false,
                    successMessage: "Profile updated successfully!", // Mensagem de sucesso
                    errorMessage: "" // Limpar mensagem de erro, se houver
                });
            })
            .catch(error => {
                console.error('Error updating user:', error);
                this.setState({
                    errorMessage: 'Error updating profile. Please try again.', // Mensagem de erro
                    successMessage: "" // Limpar mensagem de sucesso, se houver
                });
            });
    }

    handlePasswordSubmit = (event) => {
        event.preventDefault();
        const { formPassword } = this.state;

        if (formPassword.password !== formPassword.passwordConfirm) {
            this.setState({ passwordError: "Passwords do not match!" });
            return;
        }

        AllUsersService.editCurrentPassword({
            oldPassword: formPassword.oldPassword,
            password: formPassword.password
        })
            .then(response => {
                this.setState({
                    formPassword: {
                        oldPassword: "",
                        password: "",
                        passwordConfirm: ""
                    },
                    editPassword: false,
                    passwordError: "",
                    successMessage: "Password changed successfully!", // Mensagem de sucesso
                    errorMessage: "" // Limpar mensagem de erro, se houver
                });
            })
            .catch(error => {
                console.error('Error updating password:', error);
                this.setState({
                    errorMessage: 'Error updating password. Please try again.', // Mensagem de erro
                    successMessage: "" // Limpar mensagem de sucesso, se houver
                });
            });
    }

    clearSuccessMessage = () => {
        this.setState({ successMessage: "" });
    }

    clearErrorMessage = () => {
        this.setState({ errorMessage: "" });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser, formData, editMode, editPassword, formPassword, passwordError, successMessage, errorMessage } = this.state;

        return (
            <div className="container">
                {this.state.userReady ? (
                    <div>
                        <header className="jumbotron">
                            <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="profile-img"
                                className="profile-img-card"
                            />
                            <h3>
                                Profile:<strong className="username-profile">{currentUser.user.email}</strong>
                            </h3>
                        </header>
                        {successMessage && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                {successMessage}
                                <button type="button" className="close-button" data-dismiss="alert" aria-label="Close" onClick={this.clearSuccessMessage}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                        {passwordError && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {passwordError}
                                    <button type="button" className="close" onClick={() => this.setState({ passwordError: "" })} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {errorMessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.clearErrorMessage}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                        <div className="profile-card">
                            {!editMode ? (
                                <div>
                                    <table className="table table-bordered">
                                        <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{currentUser.user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{currentUser.user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>{currentUser.user.address || 'Not available'}</td>
                                        </tr>
                                        <tr>
                                            <th>Role</th>
                                            <td>{currentUser.user.role.roleName}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <button onClick={this.toggleEditMode} className="btn btn-primary">
                                        Edit Profile
                                    </button>
                                    <button onClick={this.togglePasswordMode} className="btn btn-secondary">
                                        Change Password
                                    </button>
                                </div>
                            ) : (
                                <Form
                                    onSubmit={this.handleSubmit}
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
                                            value={formData.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="role">Role</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="role"
                                            value={formData.role.roleName}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={this.toggleEditMode}>
                                            Cancel
                                        </button>
                                    </div>
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={c => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                            )}
                            {editPassword && (
                                <Form
                                    onSubmit={this.handlePasswordSubmit}
                                    ref={c => {
                                        this.formPassword = c;
                                    }}
                                >
                                    <div className="form-group">
                                        <label htmlFor="oldPassword">Current Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="oldPassword"
                                            value={formPassword.oldPassword}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formPassword.password}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="passwordConfirm">Confirm New Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="passwordConfirm"
                                            value={formPassword.passwordConfirm}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            Change Password
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={this.togglePasswordMode}>
                                            Cancel
                                        </button>
                                    </div>
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={c => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}