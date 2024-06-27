import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "signin", { email, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    register(name, email, password) {
        return axios.post(API_URL + "signup", { name, email, password });
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

export default new AuthService();
