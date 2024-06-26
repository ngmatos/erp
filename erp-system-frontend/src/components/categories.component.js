import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { required, vname } from '../helpers/validation';
import AuthService from '../services/auth.service';
import AllCategoryService from '../services/crud/category.service';

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { email: '', user: {} },
            categories: [],
            showModal: false,
            newCategory: {
                categoryName: ''
            },
            showEditModal: false,
            currentCategoryToEdit: {
                id: null,
                categoryName: ''
            },
            error: false,
            errorMessage: '',
            successMessage: '',
            modalErrorMessage: '',
            accessDenied: false,
            accessDeniedMessage: '',
            isAdmin: false
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            this.setState({ redirect: '/' });
        } else {
            if (
                !currentUser.user.authorities.some(
                    (auth) => auth.authority === 'ROLE_ADMIN'
                ) &&
                !currentUser.user.authorities.some(
                    (auth) => auth.authority === 'ROLE_EMPLOYER'
                )
            ) {
                this.setState({
                    redirect: '/',
                    accessDenied: true,
                    accessDeniedMessage: 'You do not have access to this page.'
                });
            } else {
                this.setState({
                    currentUser: currentUser,
                    userReady: true,
                    isAdmin: true
                });

                // Carregar a lista de produtos e categorias após o componente montar
                this.loadAllCategories();
            }
        }
    }

    // Função para carregar todas as categorias usando AllCategoryService
    loadAllCategories() {
        AllCategoryService.getAllCategory()
            .then((response) => {
                this.setState({ categories: response });
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                this.setState({
                    error: true,
                    errorMessage:
                        'Failed to load categories. Please try again later.'
                });
            });
    }

    // Função para abrir o modal de adicionar categoria
    openModal = () => {
        this.setState({
            showModal: true,
            modalErrorMessage: '',
            successMessage: '',
            newCategory: { categoryName: '' }
        });
    };

    // Função para fechar o modal de adicionar categoria
    closeModal = () => {
        this.setState({ showModal: false, modalErrorMessage: '' });
    };

    // Função para abrir o modal de editar categoria
    openEditModal = (category) => {
        this.setState({
            showEditModal: true,
            currentCategoryToEdit: {
                id: category.id,
                categoryName: category.categoryName
            },
            successMessage: ''
        });
    };

    // Função para fechar o modal de editar categoria
    closeEditModal = () => {
        this.setState({
            showEditModal: false,
            currentCategoryToEdit: { id: null, categoryName: '' }
        });
    };

    // Função para lidar com mudanças nos inputs do formulário de adicionar categoria
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            newCategory: {
                ...prevState.newCategory,
                [name]: value
            }
        }));
    };

    // Função para lidar com mudanças nos inputs do formulário de editar categoria
    handleEditInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            currentCategoryToEdit: {
                ...prevState.currentCategoryToEdit,
                [name]: value
            }
        }));
    };

    // Função para adicionar nova categoria
    handleAddCategory = (event) => {
        event.preventDefault();
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            const { categoryName } = this.state.newCategory;

            const newCategory = {
                categoryName
            };

            AllCategoryService.createCategory(newCategory)
                .then((response) => {
                    console.log('Category added:', response);
                    this.closeModal();
                    this.loadAllCategories();
                    this.setState({
                        successMessage: 'Category added successfully!'
                    });
                })
                .catch((error) => {
                    console.error('Error adding Category:', error);
                    this.setState({
                        modalErrorMessage:
                            'Failed to add Category. Please try again later.'
                    });
                });
        }
    };

    // Função para editar categoria
    handleEditCategory = (event) => {
        event.preventDefault();
        const { currentCategoryToEdit } = this.state;

        const updatedCategory = {
            categoryName: currentCategoryToEdit.categoryName
        };

        AllCategoryService.editCategory(
            currentCategoryToEdit.id,
            updatedCategory
        )
            .then((response) => {
                console.log('Category updated:', response);
                this.closeEditModal();
                this.loadAllCategories();
                this.setState({
                    successMessage: 'Category updated successfully!'
                });
            })
            .catch((error) => {
                console.error('Error updating Category:', error);
                this.setState({
                    modalErrorMessage:
                        'Failed to update Category. Please try again later.'
                });
            });
    };

    // Função para deletar categoria
    handleDeleteCategory = () => {
        const { currentCategoryToEdit } = this.state;

        if (
            window.confirm(
                `Are you sure you want to delete Category ${currentCategoryToEdit.categoryName}?`
            )
        ) {
            AllCategoryService.deleteCategory(currentCategoryToEdit.id)
                .then((response) => {
                    console.log('Category deleted:', response);
                    this.closeEditModal();
                    this.loadAllCategories();
                    this.setState({
                        successMessage: 'Category deleted successfully!'
                    });
                })
                .catch((error) => {
                    console.error('Error deleting Category:', error);
                    this.setState({
                        modalErrorMessage:
                            'Failed to delete Category. Please try again later.'
                    });
                });
        }
    };

    // Função para fechar o alerta de erro no modal
    closeModalErrorMessage = () => {
        this.setState({ modalErrorMessage: '' });
    };

    // Função para fechar o alerta de erro na página
    closeErrorAlert = () => {
        this.setState({ error: false, errorMessage: '' });
    };

    // Função para fechar o alerta de sucesso
    closeSuccessAlert = () => {
        this.setState({ successMessage: '' });
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />;
        }

        const {
            currentUser,
            showModal,
            newCategory,
            showEditModal,
            currentCategoryToEdit,
            error,
            errorMessage,
            successMessage,
            modalErrorMessage,
            accessDenied,
            accessDeniedMessage,
            categories,
            isAdmin
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
                                    <strong>CATEGORIES TABLE</strong>
                                </h3>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.openModal}
                                >
                                    Add Category
                                </button>
                            </header>
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                </tr>
                                </thead>
                                <tbody className="text-center">
                                {categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.id}</td>
                                        <td
                                            onClick={() =>
                                                this.openEditModal(
                                                    category
                                                )
                                            }
                                            style={{
                                                cursor: 'pointer',
                                                color: 'blue'
                                            }}
                                        >
                                            {category.categoryName}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {/* Modal para adicionar nova categoria */}
                            {showModal && (
                                <div
                                    className="modal"
                                    tabIndex="-1"
                                    role="dialog"
                                    style={{ display: 'block' }}
                                >
                                    <div
                                        className="modal-dialog"
                                        role="document"
                                    >
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">
                                                    Add New Category
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={this.closeModal}
                                                >
                                                    <span aria-hidden="true">
                                                        &times;
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <Form
                                                    onSubmit={
                                                        this.handleAddCategory
                                                    }
                                                    ref={(c) => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="categoryName">
                                                            Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="categoryName"
                                                            value={
                                                                newCategory.categoryName
                                                            }
                                                            onChange={
                                                                this.handleInputChange
                                                            }
                                                            validations={[
                                                                required,
                                                                vname
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">
                                                            Save changes
                                                        </button>
                                                    </div>

                                                    <CheckButton
                                                        style={{
                                                            display: 'none'
                                                        }}
                                                        ref={(c) => {
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
                                                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Modal para editar categoria */}
                            {showEditModal && currentCategoryToEdit && (
                                <div
                                    className="modal"
                                    tabIndex="-1"
                                    role="dialog"
                                    style={{ display: 'block' }}
                                >
                                    <div
                                        className="modal-dialog"
                                        role="document"
                                    >
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title">
                                                    Edit Category
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                    onClick={this.closeEditModal}
                                                >
                                                    <span aria-hidden="true">
                                                        &times;
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <Form
                                                    onSubmit={
                                                        this.handleEditCategory
                                                    }
                                                    ref={(c) => {
                                                        this.form = c;
                                                    }}
                                                >
                                                    <div className="form-group">
                                                        <label htmlFor="categoryName">
                                                            Name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name="categoryName"
                                                            value={
                                                                currentCategoryToEdit.categoryName
                                                            }
                                                            onChange={
                                                                this.handleEditInputChange
                                                            }
                                                            validations={[
                                                                required,
                                                                vname
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <button className="btn btn-primary btn-block">
                                                            Save changes
                                                        </button>
                                                    </div>

                                                    {isAdmin && (
                                                        <div className="form-group">
                                                            <button className="btn btn-danger btn-block" onClick={this.handleDeleteCategory}>Delete Category</button>
                                                        </div>
                                                    )}

                                                    <CheckButton
                                                        style={{
                                                            display: 'none'
                                                        }}
                                                        ref={(c) => {
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
                                                <button type="button" className="btn btn-secondary" onClick={this.closeEditModal}>
                                                    Close
                                                </button>
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
