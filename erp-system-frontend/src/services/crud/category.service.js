import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/category/';

class AllCategoryService {

        getAllCategory() {
            return axios.get(API_URL, { headers: authHeader() });
        }

        getCategoryById(id) {
            return axios.get(API_URL + 'id/' + id, { headers: authHeader() });
        }

        getCategoryByName(name) {
            return axios.get(API_URL + 'name/' + name, { headers: authHeader() });
        }

        //Admin Role or Employer Role
        createCategory(data) {
            return axios.post(API_URL, data, { headers: authHeader() });
        }

        //Admin Role or Employer Role
        editCategory(id, data) {
            return axios.put(API_URL + id, data, { headers: authHeader() });
        }

        //Admin Role
        deleteCategory(id) {
            return axios.delete(API_URL + id, { headers: authHeader() });
        }

}

export default new AllCategoryService();