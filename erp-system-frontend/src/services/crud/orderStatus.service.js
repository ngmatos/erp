import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/orders/status';

class AllOrderStatusService {

    getAllOrderStatus() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all order status:', error);
                throw error;
            });
    }

    getOrderStatusById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching order status with ID ${id}:`, error);
                throw error;
            });
    }

    getOrderStatusByName(name) {
        return axios.get(API_URL + '/name/' + name, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching order status with name ${name}:`, error);
                throw error;
            });
    }

    //Admin Role
    createOrderStatus(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating order status:', error);
                throw error;
            });
    }

    //Admin Role
    editOrderStatus(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error editing order status with ID ${id}:`, error);
                throw error;
            });
    }

    //Admin Role
    deleteOrderStatus(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    console.error(`Error deleting order status with ID ${id}:`, error);
                    throw error;
                }
            });
    }

}

export default new AllOrderStatusService();