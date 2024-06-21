import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/orders/status/';

class AllOrderStatusService {

    getAllOrderStatus() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getOrderStatusById(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    getOrderStatusByName(name) {
        return axios.get(API_URL + 'name/' + name, { headers: authHeader() });
    }

    //Admin Role
    createOrderStatus(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    //Admin Role
    editOrderStatus(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    //Admin Role
    deleteOrderStatus(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

}

export default new AllOrderStatusService();