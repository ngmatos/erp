import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/employers/';

class AllEmployersService {

    getAllEmployers() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getEmployerById(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    //Admin Role
    createEmployer(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    //Admin Role
    editEmployer(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    //Admin Role
    deleteEmployer(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

}

export default new AllEmployersService();
