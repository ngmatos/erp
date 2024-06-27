import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/orderItems';

class AllOrderItemsService {

    getAllOrderItems() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all orderItems:', error);
                throw error;
            });
    }

    getOrderItemById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching orderItem with ID ${id}:`, error);
                throw error;
            });
    }

    getOrderItemsByQuantity(quantity) {
        return axios.get(API_URL + '/quantity/' + quantity, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching orderItem with Quantity ${quantity}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    createOrderItem(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating orderItem:', error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    editOrderItem(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error editing orderItem:', error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    deleteOrderItem(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error deleting orderItem:', error);
                throw error;
            });
    }

    editQuantityOrderItem(id, quantity) {
        return axios.put(API_URL + '/' + id + '/' + quantity, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error editing orderItem:', error);
                throw error;
            });
    }

}

export default new AllOrderItemsService();