import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { required, email, vname, vpassword, vaddress } from "../helpers/validation";
import AllClientsService from "../services/crud/clients.service";
import AllOrdersService from "../services/crud/orders.service";
import AuthService from "../services/auth.service";

export default class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} },
            clients: [],
            orders: [],
            orderCounts: {},
            selectedOrders: [],
            showModal: false,
            error: false,
            errorMessage: "",
            showModalAddClient: false,
            newClient: {
                name: "",
                email: "",
                address: "",
                password: "",
            },
            modalErrorMessage: "",
            showEditModal: false,
            currentClientToEdit: {
                id: "",
                name: "",
                email: "",
                address: "",
                password: "",
                role: { roleName: "", roleId: "" }
            },
            successMessage: ""
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
                this.loadAllClients();
            }
        }
    }

    loadAllClients() {
        AllClientsService.getAllClients()
            .then(response => {
                this.setState({ clients: response }, () => {
                    this.state.clients.forEach(client => {
                        this.loadAllOrdersByClient(client.id);
                    });
                });
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMessage: 'Erro ao carregar os clientes. Por favor, tente novamente mais tarde.'
                });
            });
    }

    loadAllOrdersByClient(clientId) {
        AllOrdersService.getOrdersByCustomerId(clientId)
            .then(response => {
                this.setState(prevState => ({
                    orders: [...prevState.orders, ...response],
                    orderCounts: {
                        ...prevState.orderCounts,
                        [clientId]: response.length
                    }
                }));
            })
            .catch(error => {
                this.setState({
                    error: false,
                    errorMessage: 'Erro ao carregar os pedidos. Por favor, tente novamente mais tarde.'
                });
            });
    }

    handleShowOrders = (clientId) => {
        const selectedOrders = this.state.orders.filter(order => order.customer.id === clientId);
        this.setState({ selectedOrders, showModal: true });
    }

    closeErrorAlert = () => {
        this.setState({ error: false, errorMessage: "" });
    }

    closeSuccessAlert = () => {
        this.setState({ successMessage: "" });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    openModalAddClient = () => {
        this.setState({ showModalAddClient: true, modalErrorMessage: "" });
    }

    closeModalAddClient = () => {
        this.setState({ showModalAddClient: false, modalErrorMessage: "" });
    }

    openModalEdit = user => {
        this.setState({
            showEditModal: true,
            currentClientToEdit: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: { roleName: user.role.roleName, roleId: user.role.roleId }
            }
        });
    };

    closeModalEdit = () => {
        this.setState({ showEditModal: false, currentClientToEdit: null });
    };

    handleEditClientInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentClientToEdit: {
                ...prevState.currentClientToEdit,
                [name]: value
            }
        }));
    };

    handleEditClient = event => {
        event.preventDefault();
        const { currentClientToEdit } = this.state;
        AllClientsService.editClient(currentClientToEdit.id, {
            name: currentClientToEdit.name,
            email: currentClientToEdit.email,
            address: currentClientToEdit.address
        })
            .then(response => {
                this.closeModalEdit();
                this.setState({ successMessage: "Client updated successfully!" });
                this.loadAllClients();
            })
            .catch(error => {
                this.setState({ modalErrorMessage: "Failed to update Client. Please try again later." });
            });
    };

    handleDeleteClient = () => {
        const { currentClientToEdit } = this.state;
        if (window.confirm(`Are you sure you want to delete Client ${currentClientToEdit.name}?`)) {
            AllClientsService.deleteClient(currentClientToEdit.id)
                .then(response => {
                    this.closeModalEdit();
                    this.setState({ successMessage: "Client deleted successfully!" });
                    this.loadAllClients();
                })
                .catch(error => {
                    this.setState({ modalErrorMessage: "Failed to delete Client. Please try again later." });
                });
        }
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newClient: {
                ...prevState.newClient,
                [name]: value
            }
        }));
    }

    handleAddClient = event => {
        event.preventDefault();
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            const { name, email, address, password } = this.state.newClient;
            AllClientsService.createClient({ name, email, address, password })
                .then(response => {
                    this.setState({ showModalAddClient: false, successMessage: "Client added successfully!" });
                    this.loadAllClients();
                })
                .catch(error => {
                    this.setState({ modalErrorMessage: "Failed to add client. Please try again later." });
                });
        }
    }

    closeModalErrorAlert = () => {
        this.setState({ modalErrorMessage: "" });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        const { clients, orderCounts, selectedOrders, showModal, error, errorMessage, showModalAddClient, newClient, modalErrorMessage, showEditModal, currentClientToEdit, successMessage } = this.state;

        return (
            <div className="container">
                {this.state.userReady && (
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>CLIENTS TABLE</strong>
                            </h3>
                            <button className="btn btn-primary" onClick={this.openModalAddClient}>
                                Add Client
                            </button>
                        </header>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client, index) => (
                                <tr key={index}>
                                    <td onClick={() => this.openModalEdit(client)} style={{ cursor: 'pointer', color: 'blue' }}>
                                        {client.name}
                                    </td>
                                    <td>{client.email}</td>
                                    <td>{client.address}</td>
                                    <td>{client.role.roleName} (ID: {client.role.roleId})</td>
                                    <td>
                                        <span> {orderCounts[client.id] ? orderCounts[client.id] : 0} Orders </span>
                                        {orderCounts[client.id] > 0 && (
                                            <button className="btn btn-info order-info-button" onClick={() => this.handleShowOrders(client.id)}>
                                                View Orders
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {showModalAddClient && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="modal-title">Add New Client</h3>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModalAddClient}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <Form onSubmit={this.handleAddClient} ref={c => { this.form = c; }}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        value={newClient.name}
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
                                                        value={newClient.email}
                                                        onChange={this.handleInputChange}
                                                        validations={[required, email]}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Address</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="address"
                                                        value={newClient.address}
                                                        onChange={this.handleInputChange}
                                                        validations={[required, vaddress]}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <Input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        value={newClient.password}
                                                        onChange={this.handleInputChange}
                                                        validations={[required, vpassword]}
                                                    />
                                                </div>
                                                {modalErrorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {modalErrorMessage}
                                                        <button type="button" className="close" onClick={this.closeModalErrorAlert}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">Add Client</button>
                                                </div>
                                                <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showModal && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="modal-title">Orders Details</h3>
                                            <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {selectedOrders.length > 0 ? (
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>Order No</th>
                                                        <th>Order Date</th>
                                                        <th>Date Created</th>
                                                        <th>Status</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {selectedOrders.map((order, index) => (
                                                        <tr key={index}>
                                                            <td>{order.id}</td>
                                                            <td>{order.orderNo}</td>
                                                            <td>{new Date(order.dateOrdered).toLocaleDateString()}</td>
                                                            <td>{new Date(order.dateCreated).toLocaleDateString()}</td>
                                                            <td>{order.orderStatus.status}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>No orders available for this client.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showEditModal && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="modal-title">Edit Client</h3>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModalEdit}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <Form onSubmit={this.handleEditClient} ref={c => { this.form = c; }}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        value={currentClientToEdit.name}
                                                        onChange={this.handleEditClientInputChange}
                                                        validations={[required, vname]}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        value={currentClientToEdit.email}
                                                        onChange={this.handleEditClientInputChange}
                                                        validations={[required, email]}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Address</label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        name="address"
                                                        value={currentClientToEdit.address}
                                                        onChange={this.handleEditClientInputChange}
                                                        validations={[required, vaddress]}
                                                    />
                                                </div>
                                                {modalErrorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {modalErrorMessage}
                                                        <button type="button" className="close" onClick={this.closeModalErrorAlert}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )}
                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">Save Changes</button>
                                                </div>
                                                <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                                            </Form>
                                            <button className="btn btn-danger" onClick={this.handleDeleteClient}>
                                                Delete Client
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                                <button type="button" className="close" onClick={this.closeErrorAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                                <button type="button" className="close" onClick={this.closeSuccessAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
