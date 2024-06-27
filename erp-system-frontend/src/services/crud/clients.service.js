import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/clients';

class AllClientsService {

    getAllClients() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all clients:', error);
                throw error;
            });
    }

    getClientById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching client with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    createClient(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating client:', error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    editClient(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error updating client with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    deleteClient(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error deleting client with ID ${id}:`, error);
                throw error;
            });
    }

}

export default new AllClientsService();