import { useQuery } from "@tanstack/react-query";
import { fetchSpecificProductDetails } from "@/function/fetchSpecificProductDetails";

export const useSpecificProductDetails = (productId: string) => {
    // console.log('Receive product Id in query to fetch details is', productId);

    return useQuery({
        queryKey: ["specific course", productId],
        queryFn: () => fetchSpecificProductDetails(productId),
        enabled: !!productId
    })
}