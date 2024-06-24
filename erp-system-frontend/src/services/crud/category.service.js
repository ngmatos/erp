import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/category';

class AllCategoryService {

        getAllCategory() {
            return axios.get(API_URL, { headers: authHeader() })
                .then(response => {
                    console.log('Response:', response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error('Error fetching all category:', error);
                    throw error;
                });
        }

        getCategoryById(id) {
            return axios.get(API_URL + '/id/' + id, { headers: authHeader() })
                .then(response => {
                    console.log('Response:', response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error(`Error fetching category with ID ${id}:`, error);
                    throw error;
                });
        }

        getCategoryByName(name) {
            return axios.get(API_URL + '/name/' + name, { headers: authHeader() })
                .then(response => {
                    console.log('Response:', response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error(`Error fetching category with Name ${name}:`, error);
                    throw error;
                });
        }

        //Admin Role or Employer Role
        createCategory(data) {
            return axios.post(API_URL, data, { headers: authHeader() })
                .then(response => {
                    console.log('Response:', response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error('Error creating category:', error);
                    throw error;
                });
        }

        //Admin Role or Employer Role
        editCategory(id, data) {
            return axios.put(API_URL + '/' + id, data, { headers: authHeader() })
                .then(response => {
                    console.log('Response:', response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error('Error editing category:', error);
                    throw error;
                });
        }

        //Admin Role
        deleteCategory(id) {
            return axios.delete(API_URL + '/' + id, { headers: authHeader() })
                .then(response => {
                    console.log('Response:', response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    throw error;
                });
        }

}

export default new AllCategoryService();