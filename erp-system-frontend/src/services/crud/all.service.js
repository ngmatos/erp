import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/';

class AllService {
    getPublicContent() {
        return axios.get(API_URL+ "resource");
    }
}

export default new AllService();
