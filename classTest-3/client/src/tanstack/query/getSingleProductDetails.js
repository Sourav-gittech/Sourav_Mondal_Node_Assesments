import { useQuery } from "@tanstack/react-query"
import { fetchSinglePRoductData } from "../../function/fetchSingleProduct"

export const useSinglePRoductData = (productId) => {

    useQuery({
        queryKey: ['singleProductData', productId],
        queryFn: () => fetchSinglePRoductData(productId),
        enabled: !!productId
    })
}