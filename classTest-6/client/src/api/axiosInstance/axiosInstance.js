import axios from "axios";
import baseURL from "../apiUrl/apiUrl";

const axiosInstance = axios.create({
    baseURL: baseURL,
    // headers: {}
});

axiosInstance.interceptors.request.use(
    async con => {
        
        const token = sessionStorage.getItem('auth-token') || localStorage.getItem('auth-token');

        if (token) {
            con.headers['Authorization'] = token;
        }

        return con;
    },
    err => {
        return Promise.reject(err);
    }
);

export default axiosInstance;