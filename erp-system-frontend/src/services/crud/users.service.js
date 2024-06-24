import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/users';

class AllUsersService {
    getAllUsers() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all users:', error);
                throw error;
            });
    }

    getAllAdmins() {
        return axios.get(API_URL + '/Admin', { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all admins:', error);
                throw error;
            });
    }

    getUserById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching user with ID ${id}:`, error);
                throw error;
            });
    }

    getAdminById(id) {
        return axios.get(API_URL + '/Admin/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching admin with ID ${id}:`, error);
                throw error;
            });
    }

    // Admin Role
    createUser(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating user:', error);
                throw error;
            });
    }

    // Admin Role
    editUser(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error editing user with ID ${id}:`, error);
                throw error;
            });
    }

    // Admin Role
    deleteUser(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    console.error('Erro ao remover usuário:', error.response.data);
                    alert('Não é possível remover o usuário devido a dependências.');
                } else {
                    console.error('Erro ao remover usuário:', error);
                }
                throw error;
            });
    }

    // Admin Role
    editRoleUser(id, role) {
        return axios.put(API_URL + '/' + id + '/' + role, null, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error editing role for user with ID ${id}:`, error);
                throw error;
            });
    }

    getCurrentUser() {
        return axios.get(API_URL + '/current', { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching current user:', error);
                throw error;
            });
    }

    editCurrentUser(data) {
        return axios.put(API_URL + '/current', data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error editing current user:', error);
                throw error;
            });
    }

    editCurrentPassword(data) {
        return axios.put(API_URL + '/current/password', data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error editing current password:', error);
                throw error;
            });
    }
}

export default new AllUsersService();
