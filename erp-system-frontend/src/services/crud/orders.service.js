import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/orders/';

class AllOrdersService {

    getAllOrders() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getOrderById(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    getOrdersByStatusName(statusName) {
        return axios.get(API_URL + 'statusName/' + statusName, { headers: authHeader() });
    }

    getOrdersByCustomerId(customerId) {
        return axios.get(API_URL + 'customer/' + customerId, { headers: authHeader() });
    }

    //"yyyy-MM-dd"
    getOrdersByDateDay(dateDay) {
        return axios.get(API_URL + 'date/' + dateDay, { headers: authHeader() });
    }

    //"yyyy-MM"
    getOrdersByMonth(month) {
        return axios.get(API_URL + 'month/' + month, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    createOrder(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    editOrder(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    deleteOrder(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    editStatusOrder(id, status) {
        return axios.put(API_URL + id + '/' + status, { headers: authHeader() });
    }

}

export default new AllOrdersService();