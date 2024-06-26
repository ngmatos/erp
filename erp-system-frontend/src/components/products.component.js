import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required, vname, vstockQuantity } from "../helpers/validation";
import AuthService from "../services/auth.service";
import AllItemsService from "../services/crud/items.service";
import AllCategoryService from "../services/crud/category.service";

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: "", user: {} },
            products: [],
            showModal: false,
            newItem: {
                name: "",
                category: "", // Inicialmente vazio
                stockQuantity: "",
            },
            showEditModal: false,
            currentItemToEdit: {
                id: null,
                name: "",
                category: "", // Inicialmente vazio
                stockQuantity: "",
            },
            error: false,
            errorMessage: "",
            successMessage: "",
            modalErrorMessage: "",
            accessDenied: false,
            accessDeniedMessage: "",
            categories: [], // Estado para armazenar categorias
            modalRestock: false,
            restockItems: [],
            sortBy: 'orderNo', // Coluna inicial de ordenação
            sortDirection: 'asc' // Direção inicial de ordenação
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

                // Carregar a lista de produtos e categorias após o componente montar
                this.loadAllProducts();
                this.loadAllCategories();
            }
        }
    }

    // Função para carregar todos os produtos usando AllItemsService
    loadAllProducts() {
        AllItemsService.getAllItems()
            .then(response => {
                this.setState({ products: response });
            })
            .catch(error => {
                console.error('Error fetching all products:', error);
                this.setState({ error: true, errorMessage: "Failed to load products. Please try again later." });
            });
    }

    // Função para carregar todas as categorias usando AllCategoryService
    loadAllCategories() {
        AllCategoryService.getAllCategory()
            .then(categories => {
                this.setState({ categories });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                this.setState({ error: true, errorMessage: "Failed to load categories. Please try again later." });
            });
    }

    // Função para abrir o modal de adicionar produto
    openModal = () => {
        this.loadAllCategories();
        this.setState({ showModal: true, modalErrorMessage: "", successMessage: "", newItem: { name: "", category: "", stockQuantity: "" } });
    }

    // Função para fechar o modal de adicionar produto
    closeModal = () => {
        this.setState({ showModal: false, modalErrorMessage: "" });
    }

    // Função para abrir o modal de editar produto
    openEditModal = item => {
        this.loadAllCategories();
        this.setState({
            showEditModal: true,
            currentItemToEdit: {
                id: item.id,
                name: item.name,
                category: item.category.categoryName,
                stockQuantity: item.stockQuantity
            },
            successMessage: ""
        });
    };

    // Função para fechar o modal de editar produto
    closeEditModal = () => {
        this.setState({ showEditModal: false, currentItemToEdit: { id: null, name: "", category: "", stockQuantity: "" } });
    };

    // Função para lidar com mudanças nos inputs do formulário de adicionar produto
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newItem: {
                ...prevState.newItem,
                [name]: value
            }
        }));
    }

    // Função para lidar com mudanças nos inputs do formulário de editar produto
    handleEditUserInputChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            currentItemToEdit: {
                ...prevState.currentItemToEdit,
                [name]: value
            }
        }));
    };

    // Função para adicionar novo produto
    handleAddUser = event => {
        event.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const { name, category, stockQuantity } = this.state.newItem;

            const categoryId = this.state.categories.find(cat => cat.categoryName === category)?.id;

            if (!categoryId) {
                this.setState({ modalErrorMessage: "Invalid category selected. Please select a valid category." });
                return;
            }

            const newItem = {
                name,
                category: { categoryId },
                stockQuantity
            };

            AllItemsService.createItem(newItem)
                .then(response => {
                    console.log('Item added:', response);
                    this.closeModal();
                    this.loadAllProducts();
                    this.setState({ successMessage: "Item added successfully!" });
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                    this.setState({ modalErrorMessage: "Failed to add item. Please try again later." });
                });
        }
    }

    // Função para editar produto
    handleEditUser = event => {
        event.preventDefault();
        const { currentItemToEdit } = this.state;

        const categoryId = this.state.categories.find(cat => cat.categoryName === currentItemToEdit.category)?.id;

        if (!categoryId) {
            this.setState({ modalErrorMessage: "Invalid category selected. Please select a valid category." });
            return;
        }

        const updatedItem = {
            name: currentItemToEdit.name,
            category: { categoryId },
            stockQuantity: currentItemToEdit.stockQuantity
        };

        AllItemsService.editItem(currentItemToEdit.id, updatedItem)
            .then(response => {
                console.log('Item updated:', response);
                this.closeEditModal();
                this.loadAllProducts();
                this.setState({ successMessage: "Item updated successfully!" });
            })
            .catch(error => {
                console.error('Error updating item:', error);
                this.setState({ modalErrorMessage: "Failed to update item. Please try again later." });
            });
    };

    // Função para deletar produto
    handleDeleteUser = () => {
        const { currentItemToEdit } = this.state;

        if (window.confirm(`Are you sure you want to delete item ${currentItemToEdit.name}?`)) {
            AllItemsService.deleteItem(currentItemToEdit.id)
                .then(response => {
                    console.log('Item deleted:', response);
                    this.closeEditModal();
                    this.loadAllProducts(); // Atualiza a lista de produtos após exclusão
                    this.setState({ successMessage: "Item deleted successfully!" });
                })
                .catch(error => {
                    console.error('Error deleting item:', error);
                    this.setState({ modalErrorMessage: "Failed to delete item. Please try again later." });
                });
        }
    }

    // Função para fechar o alerta de erro no modal
    closeModalErrorMessage = () => {
        this.setState({ modalErrorMessage: "" });
    }

    // Função para fechar o alerta de erro na página
    closeErrorAlert = () => {
        this.setState({ error: false, errorMessage: "" });
    }

    // Função para fechar o alerta de sucesso
    closeSuccessAlert = () => {
        this.setState({ successMessage: "" });
    }

    // Products to restock (list of products with stock quantity less than 5)

    restockProducts = () => {
        this.loadAllProducts();
        this.setState({
            modalRestock: true,
            successMessage: "",
            restockItems: this.state.products.filter(item => item.stockQuantity < 5)
        });
    };

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

        const { sortBy, sortDirection, modalRestock, restockItems, products, showModal, newItem, showEditModal, currentItemToEdit, error, errorMessage, successMessage, modalErrorMessage, accessDenied, accessDeniedMessage, categories } = this.state;

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
                                    <strong>PRODUCTS TABLE</strong>
                                </h3>
                                <button className="btn btn-primary" onClick={this.openModal}>
                                    Add Product
                                </button>
                                <button className="btn btn-primary" onClick={this.restockProducts}>
                                    Restock Products
                                </button>
                            </header>
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th onClick={() => this.sortByColumn('name')} style={{ cursor: 'pointer' }}>
                                        Name
                                        {sortBy === 'name' && (
                                            <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('category')} style={{ cursor: 'pointer' }}>
                                        Category
                                        {sortBy === 'category' && (
                                            <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => this.sortByColumn('stockQuantity')} style={{ cursor: 'pointer' }}>
                                        Quantity
                                        {sortBy === 'stockQuantity' && (
                                            <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="text-center">
                                {products.sort((a, b) => {
                                    const isAscending = sortDirection === 'asc' ? 1 : -1;
                                    if (sortBy === 'name') {
                                        return a.name.localeCompare(b.name) * isAscending;
                                    }
                                    if (sortBy === 'category') {
                                        return a.category.categoryName.localeCompare(b.category.categoryName) * isAscending;
                                    }
                                    if (sortBy === 'stockQuantity') {
                                        return (a.stockQuantity - b.stockQuantity) * isAscending;
                                    }
                                }).map((item, index) => (
                                    <tr key={index}>
                                        <td onClick={() => this.openEditModal(item)}
                                            style={{cursor: 'pointer', color: 'blue'}}>
                                            {item.name}
                                        </td>
                                        <td>{item.category.categoryName}</td>
                                        <td>{item.stockQuantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {/* Modal para restock */}
                            {modalRestock && (
                                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">Restock Products</h3>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ modalRestock: false })}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <table className="table table-bordered table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="text-center">
                                                    {restockItems.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.category.categoryName}</td>
                                                            <td>{item.stockQuantity}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => this.setState({ modalRestock: false })}>Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Modal para adicionar novo produto */}
                            {showModal && (
                                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">Add New Product</h3>
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
                                                            value={newItem.name}
                                                            onChange={this.handleInputChange}
                                                            validations={[required, vname]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="category">Category</label>
                                                        <select
                                                            className="form-control"
                                                            name="category"
                                                            value={newItem.category}
                                                            onChange={this.handleInputChange}
                                                        >
                                                            <option value="">Select a category</option>
                                                            {categories.map(category => (
                                                                <option key={category.id} value={category.categoryName}>
                                                                    {category.categoryName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="stockQuantity">Quantity</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="stockQuantity"
                                                            value={newItem.stockQuantity}
                                                            onChange={this.handleInputChange}
                                                            validations={[vstockQuantity]}
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
                            {/* Modal para editar produto */}
                            {showEditModal && currentItemToEdit && (
                                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">Edit Product</h3>
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
                                                            value={currentItemToEdit.name}
                                                            onChange={this.handleEditUserInputChange}
                                                            validations={[required, vname]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="category">Category</label>
                                                        <select
                                                            className="form-control"
                                                            name="category"
                                                            value={currentItemToEdit.category}
                                                            onChange={this.handleEditUserInputChange}
                                                        >
                                                            <option value="">Select a category</option>
                                                            {categories.map(category => (
                                                                <option key={category.id} value={category.categoryName}>
                                                                    {category.categoryName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="stockQuantity">Quantity</label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="stockQuantity"
                                                            value={currentItemToEdit.stockQuantity}
                                                            onChange={this.handleEditUserInputChange}
                                                            validations={[vstockQuantity]}
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
                                                <button className="btn btn-danger btn-block" onClick={this.handleDeleteUser}>Delete Product</button>
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

