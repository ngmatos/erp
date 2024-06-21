import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/orderItems/';

class AllOrderItemsService {

    getAllOrderItems() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getOrderItemById(id) {
        return axios.get(API_URL + id, { headers: authHeader() });
    }

    getOrderItemsByQuantity(quantity) {
        return axios.get(API_URL + 'quantity/' + quantity, { headers: authHeader() });
    }

    getOrderItemsByItemName(itemName) {
        return axios.get(API_URL + 'itemName/' + itemName, { headers: authHeader() });
    }

    getOrderItemsByOrderNo(orderNo) {
        return axios.get(API_URL + 'orderNo/' + orderNo, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    createOrderItem(data) {
        return axios.post(API_URL, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    editOrderItem(id, data) {
        return axios.put(API_URL + id, data, { headers: authHeader() });
    }

    //Admin Role or Employer Role
    deleteOrderItem(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

    editQuantityOrderItem(id, quantity) {
        return axios.put(API_URL + id + '/' + quantity, { headers: authHeader() });
    }

}

export default new AllOrderItemsService();