import axios from "axios";
import Service from "./Service";
const BASE_URL = `http://localhost:8000/api`;

class UserAPI {
    static login(values) {
        return axios.post(`${BASE_URL}/users/login/`, values, Service);
    }

    static register(values) {
        return axios.post(`${BASE_URL}/users/register/`, values, Service);
    }

    static getAllUsers() {
        return axios.get(`${BASE_URL}/users/all`, Service);
    }

    static deleteUser(uid) {
        return axios.delete(`${BASE_URL}/users/${uid}/`, Service);
    }
}

export default UserAPI;
