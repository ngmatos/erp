import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/orders';

class AllOrdersService {

    getAllOrders() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all orders:', error);
                throw error;
            });
    }

    getOrderById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching order with ID ${id}:`, error);
                throw error;
            });
    }

    getOrdersByStatusName(statusName) {
        return axios.get(API_URL + '/statusName/' + statusName, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching orders with status name ${statusName}:`, error);
                throw error;
            });
    }

    getOrdersByCustomerId(customerId) {
        return axios.get(API_URL + '/customer/' + customerId, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching orders with customer ID ${customerId}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    createOrder(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating order:', error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    editOrder(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error editing order with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    deleteOrder(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error deleting order with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    editStatusOrder(id, status) {
        return axios.put(API_URL + '/' + id + '/' + status, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error editing status order with ID ${id}:`, error);
                throw error;
            });
    }

}

export default new AllOrdersService();