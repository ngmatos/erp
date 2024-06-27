import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/employers';

class AllEmployersService {

    getAllEmployers() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all employers:', error);
                throw error;
            });
    }

    getEmployerById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching employer with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role
    createEmployer(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating employer:', error);
                throw error;
            });
    }

    //Admin Role
    editEmployer(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error updating employer with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role
    deleteEmployer(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error deleting employer with ID ${id}:`, error);
                throw error;
            });
    }

}

export default new AllEmployersService();
