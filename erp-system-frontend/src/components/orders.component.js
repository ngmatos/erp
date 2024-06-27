import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required, vstockQuantity } from "../helpers/validation";

import AuthService from "../services/auth.service";
import AllOrderItemsService from "../services/crud/orderItems.service";
import AllOrdersService from "../services/crud/orders.service";
import AllOrderStatusService from "../services/crud/orderStatus.service";
import AllClientsService from "../services/crud/clients.service";
import AllItemsService from "../services/crud/items.service";

export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} },
            orders: [], // Estado para armazenar a lista de orders
            showModalAdd: false,
            newOrder: {
                id: null,
                orderNo: "",
                dateOrdered: "",
                orderStatus: "",
                customer: ""
            },
            newOrderComplete: {
                id: null,
                order: "",
                item: "",
                quantity: ""
            },
            showEditModal: false,
            currentOrderToEdit: {
                id: null,
                orderNo: "",
                dateOrdered: "",
                orderStatus: "",
                customer: ""
            },
            currentOrderCompleteToEdit: {
                id: null,
                order: { id: null },
                item: "",
                quantity: ""
            },
            error: false,
            errorMessage: "",
            successMessage: "", // Novo estado para mensagens de sucesso
            modalErrorMessage: "", // Novo estado para mensagens de erro no modal
            accessDenied: false, // Estado para gerenciar o acesso negado
            accessDeniedMessage: "", // Mensagem de acesso negado
            customers: [],
            statuses: [],
            items: [],
            currentCustomer: {
                name: "",
                email: "",
                address: ""
            },
            showCustomerModal: false,
            sortBy: 'orderNo', // Coluna inicial de ordenação
            sortDirection: 'asc' // Direção inicial de ordenação
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({ redirect: "/" });
        } else {
            if (!currentUser.user.authorities.some(auth => auth.authority === "ROLE_ADMIN")  && !currentUser.user.authorities.some(auth => auth.authority === "ROLE_EMPLOYER")) {
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

                // Carregar a lista de pedidos após o componente montar
                this.loadAllOrders();
            }
        }
    }

    loadAllOrders() {
        AllOrderItemsService.getAllOrderItems()
            .then(response => {
                this.setState({ orders: response });
            })
            .catch(error => {
                console.error('Error fetching all orders:', error);
                this.setState({ error: true, errorMessage: "Failed to load orders. Please try again later." });
            });
    }

    loadAllCustomers() {
        AllClientsService.getAllClients()
            .then(response => {
                this.setState({ customers: response });
            })
            .catch(error => {
                console.error('Error fetching all customers:', error);
                this.setState({ error: true, errorMessage: "Failed to load customers. Please try again later." });
            });
    }

    loadAllOrderStatus() {
        AllOrderStatusService.getAllOrderStatus()
            .then(response => {
                this.setState({ statuses: response });
            })
            .catch(error => {
                console.error('Error fetching all order statuses:', error);
                this.setState({ error: true, errorMessage: "Failed to load order statuses. Please try again later." });
            });
    }

    loadAllItems() {
        AllItemsService.getAllItems()
            .then(response => {
                this.setState({ items: response });
            })
            .catch(error => {
                console.error('Error fetching all items:', error);
                this.setState({ error: true, errorMessage: "Failed to load items. Please try again later." });
            });
    }

    // ADD ORDERS

    openModalAdd = () => {
        this.loadAllCustomers();
        this.loadAllOrderStatus();
        this.loadAllItems();
        this.setState({
            showModalAdd: true,
            modalErrorMessage: "",
            successMessage: "",
            newOrder: {
                dateOrdered: "",
                orderStatus: "", // Inicializado corretamente
                customer: "" // Inicializado corretamente
            },
            newOrderComplete: {
                order: "", // Inicializado corretamente
                item: "", // Inicializado corretamente
                quantity: "" // Inicializado corretamente
            }
        });
    }


    closeModalAdd = () => {
        this.setState({ showModalAdd: false, modalErrorMessage: "" });
    }

    handleInputChangeAddOrder = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newOrder: {
                ...prevState.newOrder,
                [name]: value
            }
        }));
    }


    handleInputChangeAddOrderComplete = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newOrderComplete: {
                ...prevState.newOrderComplete,
                [name]: value
            }
        }));
    }

    handleAddOrder = event => {
        event.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const { newOrder, newOrderComplete } = this.state;

            const order = {
                dateOrdered: newOrder.dateOrdered,
                orderStatus: {
                    id: newOrder.orderStatus
                },
                customer: {
                    id: newOrder.customer
                }
            };


            AllOrdersService.createOrder(order)
                .then(response => {
                    console.log('Order created:', response);
                    this.setState({
                        newOrderComplete: {
                            ...newOrderComplete,
                            order: response.orderId
                        }
                    });
                    this.createOrderComplete(response.orderId, newOrderComplete.item);
                })
                .catch(error => {
                    console.error('Error creating order:', error);
                    this.setState({ modalErrorMessage: "Failed to create order. Please try again later."});
                });
        }
    }

    createOrderComplete = (orderId, itemId) => {
        const { newOrderComplete } = this.state;

        const orderComplete = {
            order: {
                id: orderId
            },
            item: {
                id: itemId
            },
            quantity: newOrderComplete.quantity
        };

        AllOrderItemsService.createOrderItem(orderComplete)
            .then(response => {
                this.closeModalAdd();
                this.loadAllOrders();
                this.setState({ successMessage: "Order created successfully!" });
            })
            .catch(error => {
                console.error('Error creating order complete:', error);
                this.setState({ modalErrorMessage: "Failed to create order complete. Please try again later." });
            });
    }

    // EDIT ORDERS

    openEditModal = order => {
        this.loadAllCustomers();
        this.loadAllOrderStatus();
        this.loadAllItems();
        this.setState({
            showEditModal: true,
            modalErrorMessage: "",
            successMessage: "",
            currentOrderCompleteToEdit: {
                id: order.id,
                order: { id: order.order.id },
                item: order.item.id,
                quantity: order.quantity
            },
            currentOrderToEdit: {
                id: order.order.id,
                orderStatus: order.order.orderStatus.id,
                customer: order.order.customer.id
            }
        });
    }

    closeEditModal = () => {
        this.setState({ showEditModal: false, modalErrorMessage: "" });
    }

    handleInputChangeEditOrder = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentOrderToEdit: {
                ...prevState.currentOrderToEdit,
                [name]: value
            }
        }));
    }

    handleInputChangeEditOrderComplete = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentOrderCompleteToEdit: {
                ...prevState.currentOrderCompleteToEdit,
                [name]: value
            }
        }));
    }

    handleEditOrder = event => {
        event.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const { currentOrderToEdit, currentOrderCompleteToEdit } = this.state;

            const order = {
                id: currentOrderToEdit.id,
                orderStatus: {
                    id: currentOrderToEdit.orderStatus
                },
                customer: {
                    id: currentOrderToEdit.customer
                }
            };

            AllOrdersService.editOrder(currentOrderToEdit.id, order)
                .then(response => {
                    console.log('Order edited:', response);
                    this.setState({
                        currentOrderCompleteToEdit: {
                            ...currentOrderCompleteToEdit,
                            order: response.id
                        }
                    })
                    this.editOrderComplete(currentOrderCompleteToEdit.id, response.id, currentOrderCompleteToEdit.item);
                })
                .catch(error => {
                    console.error('Error editing order:', error);
                    this.setState({ modalErrorMessage: "Failed to edit order. Please try again later." });
                });
        }
    }

    editOrderComplete = (orderCompleteId, orderId, itemId) => {
        const { currentOrderCompleteToEdit } = this.state;

        const orderComplete = {
            id: orderCompleteId,
            order: {
                id: orderId
            },
            item: {
                id: itemId
            },
            quantity: currentOrderCompleteToEdit.quantity
        };

        AllOrderItemsService.editOrderItem(orderCompleteId, orderComplete)
            .then(response => {
                this.closeEditModal();
                this.loadAllOrders();
                this.setState({ successMessage: "Order edited successfully!" });
            })
            .catch(error => {
                console.error('Error editing order complete:', error);
                this.setState({ modalErrorMessage: "Failed to edit order complete. Please try again later." });
            });
    }

    // DELETE ORDERS

    handleDeleteOrderComplete = () => {
        const { currentOrderCompleteToEdit } = this.state;
        const orderCompleteId = currentOrderCompleteToEdit.id;
        const orderId = currentOrderCompleteToEdit.order.id;

        if (window.confirm("Are you sure you want to delete this order?")) {
            AllOrderItemsService.deleteOrderItem(orderCompleteId)
                .then(response => {
                    console.log('Order complete deleted:', response);
                    // After deleting the complete order item, delete the main order
                    this.handleDeleteOrder(orderId);
                })
                .catch(error => {
                    console.error('Error deleting order complete:', error);
                    this.setState({ modalErrorMessage: "Failed to delete order complete. Please try again later." });
                });
        }
    }

    handleDeleteOrder = orderId => {
        AllOrdersService.deleteOrder(orderId)
            .then(response => {
                console.log('Order deleted:', response);
                this.closeEditModal();
                this.loadAllOrders();
                this.setState({ successMessage: "Order deleted successfully!" });
            })
            .catch(error => {
                console.error('Error deleting order:', error);
                // Show error message to the user
                this.setState({ error: true, errorMessage: "Failed to delete order. Please try again later." });
            });
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

    // Modal para card de customer information

    openCustomerModal = customer => {
        this.setState({
            showCustomerModal: true,
            modalErrorMessage: "",
            currentCustomer: {
                name: customer.name,
                email: customer.email,
                address: customer.address
            }
        });
    }

    closeCustomerModal = () => {
        this.setState({
            showCustomerModal: false,
            modalErrorMessage: "",
            currentCustomer: {
                name: "",
                email: "",
                address: ""
            }
        });
    }

    // Sorting Functionality

    sortByColumn = (columnName) => {
        const { sortBy, sortDirection } = this.state;

        if (sortBy === columnName) {
            // If already sorting by this column, toggle direction
            this.setState(prevState => ({
                sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc'
            }));
        } else {
            // Otherwise, set new column to sort by and default to ascending order
            this.setState({
                sortBy: columnName,
                sortDirection: 'asc'
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const hours = ("0" + date.getHours()).slice(-2);
            const minutes = ("0" + date.getMinutes()).slice(-2);

            return `${day}-${month}-${year} ${hours}:${minutes}`;
        }


        const {
            orders,
            showModalAdd,
            newOrder,
            newOrderComplete,
            showEditModal,
            currentOrderToEdit,
            currentOrderCompleteToEdit,
            error,
            errorMessage,
            successMessage,
            modalErrorMessage,
            accessDenied,
            accessDeniedMessage,
            customers,
            statuses,
            items,
            currentCustomer,
            showCustomerModal,
            sortBy,
            sortDirection
        } = this.state;

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
                                    <strong>ORDERS TABLE</strong>
                                </h3>
                                <button className="btn btn-primary" onClick={this.openModalAdd}>
                                    Add Order
                                </button>

                            </header>
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
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th onClick={() => this.sortByColumn('orderNo')} style={{cursor: 'pointer'}}>
                                        Order No
                                        {sortBy === 'orderNo' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('product')} style={{cursor: 'pointer'}}>
                                        Product
                                        {sortBy === 'product' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('quantity')} style={{cursor: 'pointer'}}>
                                        Quantity
                                        {sortBy === 'quantity' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('customer')} style={{cursor: 'pointer'}}>
                                        Customer
                                        {sortBy === 'customer' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('status')} style={{cursor: 'pointer'}}>
                                        Status
                                        {sortBy === 'status' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('dateOrdered')} style={{cursor: 'pointer'}}>
                                        Date Ordered
                                        {sortBy === 'dateOrdered' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('dateCreated')} style={{cursor: 'pointer'}}>
                                        Date Created
                                        {sortBy === 'dateCreated' && (
                                            <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                                        )}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders
                                    .sort((a, b) => {
                                        const isAscending = sortDirection === 'asc' ? 1 : -1;
                                        if (sortBy === 'orderNo') {
                                            return isAscending * (a.order.orderNo.localeCompare(b.order.orderNo));
                                        } else if (sortBy === 'product') {
                                            return isAscending * (a.item.name.localeCompare(b.item.name));
                                        } else if (sortBy === 'quantity') {
                                            return isAscending * (a.quantity - b.quantity);
                                        } else if (sortBy === 'customer') {
                                            return isAscending * (a.order.customer.name.localeCompare(b.order.customer.name));
                                        } else if (sortBy === 'status') {
                                            return isAscending * (a.order.orderStatus.status.localeCompare(b.order.orderStatus.status));
                                        } else if (sortBy === 'dateOrdered') {
                                            return isAscending * (a.order.dateOrdered.localeCompare(b.order.dateOrdered));
                                        } else if (sortBy === 'dateCreated') {
                                            return isAscending * (a.order.dateCreated.localeCompare(b.order.dateCreated));
                                        }
                                    })
                                    .map(order => (
                                        <tr key={order.id}>
                                            <td onClick={() => this.openEditModal(order)}
                                                style={{cursor: 'pointer', color: 'blue'}}>
                                                {order.order.orderNo}
                                            </td>
                                            <td>{order.item.name}</td>
                                            <td>{order.quantity}</td>
                                            <td>
                                                <button className="btn btn-link" onClick={() => this.openCustomerModal(order.order.customer)}>
                                                    {order.order.customer.name}
                                                </button>
                                            </td>
                                            <td>{order.order.orderStatus.status}</td>
                                            <td>{formatDate(order.order.dateOrdered)}</td>
                                            <td>{formatDate(order.order.dateCreated)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showCustomerModal && (
                                <div className="modal">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <header className="modal-header">
                                                <h3>
                                                    <strong>CLIENT {currentCustomer.name}</strong>
                                                </h3>
                                                <button type="button" className="close" onClick={this.closeCustomerModal}>&times;</button>
                                            </header>
                                            <div className="modal-body">
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>{currentCustomer.name}</td>
                                                        <td>{currentCustomer.email}</td>
                                                        <td>{currentCustomer.address}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={this.closeCustomerModal}>Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showModalAdd && (
                                <div className="modal" style={{ display: 'block' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">Add Order</h3>
                                                <button type="button" className="close" onClick={this.closeModalAdd}>&times;</button>
                                            </div>
                                            <div className="modal-body">
                                                <Form
                                                    onSubmit={this.handleAddOrder}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="dateOrdered">Date Ordered</label>
                                                        <Input
                                                            type="date"
                                                            className="form-control"
                                                            name="dateOrdered"
                                                            value={newOrder.dateOrdered}
                                                            onChange={this.handleInputChangeAddOrder}
                                                            validations={[required]}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="customer">Customer</label>
                                                        <select
                                                            className="form-control"
                                                            name="customer"
                                                            value={newOrder.customer}
                                                            onChange={this.handleInputChangeAddOrder}
                                                        >
                                                            <option value="">Select a customer</option>
                                                            {customers.map(customer => (
                                                                <option key={customer.id} value={customer.id}>
                                                                    {customer.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="orderStatus">Order Status</label>
                                                        <select
                                                            className="form-control"
                                                            name="orderStatus"
                                                            value={newOrder.orderStatus}
                                                            onChange={this.handleInputChangeAddOrder}
                                                        >
                                                            <option value="">Select a status</option>
                                                            {statuses.map(status => (
                                                                <option key={status.id} value={status.id}>
                                                                    {status.status}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="item">Product</label>
                                                        <select
                                                            className="form-control"
                                                            name="item"
                                                            value={newOrderComplete.item}
                                                            onChange={this.handleInputChangeAddOrderComplete}
                                                        >
                                                            <option value="">Select a product</option>
                                                            {items.map(item => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.name} - {item.stockQuantity}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="quantity">Quantity</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="quantity"
                                                            value={newOrderComplete.quantity}
                                                            onChange={this.handleInputChangeAddOrderComplete}
                                                            validations={[required, vstockQuantity]}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Add Order</button>
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
                                                        <button type="button" className="close"
                                                                onClick={this.closeModalErrorMessage}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                        onClick={this.closeModalAdd}>Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showEditModal && (
                                <div className="modal" style={{display: 'block'}}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">Edit Order</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeEditModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <Form
                                                    onSubmit={this.handleEditOrder}
                                                    ref={c => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="customer">Customer</label>
                                                        <select
                                                            className="form-control"
                                                            name="customer"
                                                            value={currentOrderToEdit.customer}
                                                            onChange={this.handleInputChangeEditOrder}
                                                        >
                                                            <option value="">Select a customer</option>
                                                            {customers.map(customer => (
                                                                <option key={customer.id} value={customer.id}>
                                                                    {customer.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="orderStatus">Order Status</label>
                                                        <select
                                                            className="form-control"
                                                            name="orderStatus"
                                                            value={currentOrderToEdit.orderStatus}
                                                            onChange={this.handleInputChangeEditOrder}
                                                        >
                                                            <option value="">Select a status</option>
                                                            {statuses.map(status => (
                                                                <option key={status.id} value={status.id}>
                                                                    {status.status}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="item">Product</label>
                                                        <select
                                                            className="form-control"
                                                            name="item"
                                                            value={currentOrderCompleteToEdit.item}
                                                            onChange={this.handleInputChangeEditOrderComplete}
                                                        >
                                                            <option value="">Select a product</option>
                                                            {items.map(item => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.name} - {item.stockQuantity}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="quantity">Quantity</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="quantity"
                                                            value={currentOrderCompleteToEdit.quantity}
                                                            onChange={this.handleInputChangeEditOrderComplete}
                                                            validations={[required, vstockQuantity]}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">Save Changes
                                                        </button>
                                                    </div>
                                                    <CheckButton
                                                        style={{display: "none"}}
                                                        ref={c => {
                                                            this.checkBtn = c;
                                                        }}
                                                    />
                                                </Form>
                                                <button className="btn btn-danger btn-block" onClick={this.handleDeleteOrderComplete}>
                                                    Delete Order
                                                </button>
                                                {modalErrorMessage && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {modalErrorMessage}
                                                        <button type="button" className="close"
                                                                onClick={this.closeModalErrorMessage}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={this.closeEditModal}>Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        );
    }
}
