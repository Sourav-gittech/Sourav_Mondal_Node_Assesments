import axios from "axios"
import baseUrl from "../apiUrl/apiUrl"

const axiosInstance = axios.create({
    baseURL: baseUrl
})

export default axiosInstance;