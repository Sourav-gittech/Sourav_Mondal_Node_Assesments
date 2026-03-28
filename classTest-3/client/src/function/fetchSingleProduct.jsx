import { endPoint_Product } from "../api/apiUrl/apiUrl";
import axiosInstance from "../api/axiosInstance/axiosInstance";

export const fetchSinglePRoductData = (productId) => {
    try {
        async () => {
            const response = await axiosInstance.get(`${endPoint_Product}/${productId}`);
            console.log('Response for fetching product details', response);

            return response?.data;
        }
    }
    catch (err) {
        console.log('Error occured', err);
    }
}