"use client";

import ProductCard from "@/components/ProductCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchAllProduct } from "@/redux/slice/productSlice";
import getSweetAlert from "@/utils/alert/sweetAlert";
import { Product } from "@/interface/Product";
import { Archive, Loader2 } from "lucide-react";
import { RootState } from "@/redux/store/store";


export default function ProductsPage() {

    const dispatch = useAppDispatch();
    const { isProductLoading, productData, hasProductError } = useAppSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(fetchAllProduct(false)).unwrap()
            .then((res: any) => {
                // console.log('Response for fetching all products', res);
            })
            .catch((err: any) => {
                console.log('Error occured', err);
                getSweetAlert('Oops!', 'Something went wrong', "error");
            })
    }, []);

    // console.log('Received all product data', productData);

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-600">Available Products</h1>
            </div>

            {/* Product Grid */}
            {isProductLoading ? (
                <Loader2 className='animate-spin w-12 h-12 text-gray-400 my-30 mx-auto' />
            ) : (
                productData?.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productData?.map((product: Product, index: number) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    : (
                        <>
                        <Archive className="w-20 h-20 text-gray-500 mx-auto mt-50" />
                        <p className="text-center text-gray-600 text-[16px]">No product available</p>
                        </>
                    ))}
        </>
    );
}