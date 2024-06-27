import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/items';

class AllItemsService {

    getAllItems() {
        return axios.get(API_URL, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching all items:', error);
                throw error;
            });
    }

    getItemById(id) {
        return axios.get(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching item with ID ${id}:`, error);
                throw error;
            });
    }

    getItemsByCategory(category) {
        return axios.get(API_URL + '/category/' + category, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching items with category ${category}:`, error);
                throw error;
            });
    }

    getItemsByStockQuantity(stockQuantity) {
        return axios.get(API_URL + '/stockQuantity/' + stockQuantity, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error fetching items with stock quantity ${stockQuantity}:`, error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    createItem(data) {
        return axios.post(API_URL, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error creating item:', error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    editItem(id, data) {
        return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error editing item:', error);
                throw error;
            });
    }

    //Admin Role
    deleteItem(id) {
        return axios.delete(API_URL + '/' + id, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                throw error;
            });
    }

    //Admin Role or Employer Role
    removeStockQuantity(id, stockQuantity) {
        return axios.put(API_URL + '/stockQuantity/' + id + '/' + stockQuantity, { headers: authHeader() })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error editing stock quantity:', error);
                throw error;
            });
    }

}

export default new AllItemsService();