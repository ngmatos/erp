import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/items/';

class AllItemsService {

    getAllItems() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getItemById(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    getItemsByCategory(category) {
        return axios.get(API_URL + 'category/' + category, { headers: authHeader() });
    }

    getItemsByStockQuantity(stockQuantity) {
        return axios.get(API_URL + 'stockQuantity/' + stockQuantity, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    createItem(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    editItem(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    //Admin Role
    deleteItem(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    editStockQuantity(id, stockQuantity) {
        return axios.put(API_URL + 'stockQuantity/' + id + '/' +stockQuantity, { headers: authHeader() });
    }

}

export default new AllItemsService();