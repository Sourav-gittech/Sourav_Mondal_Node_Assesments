import { endPoint_fetch_specific } from "../api/apiUrl/apiUrl"
import axiosInstance from "../api/axiosInstance/axiosInstance"

export const fetchSpecificProductDetails = async (productId: string) => {
    // console.log('Receive product Id to fetch details is', productId);

    const res = await axiosInstance.get(endPoint_fetch_specific + `${productId}`);
    // console.log('Response for fetching a specific product', res);

    return res?.data;
}