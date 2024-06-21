import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/clients/';

class AllClientsService {

    getAllClients() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getClientById(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    createClient(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    editClient(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    deleteClient(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

}

export default new AllClientsService();