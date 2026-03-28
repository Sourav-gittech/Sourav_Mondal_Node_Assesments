"use client";

import ProductCard from "@/components/ProductCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { deleteTrashProductData, fetchAllProduct } from "@/redux/slice/productSlice";
import getSweetAlert from "@/utils/alert/sweetAlert";
import { Product } from "@/interface/Product";
import { Loader2 } from "lucide-react";
import { RootState } from "@/redux/store/store";
import Image from "next/image";


export default function TrashPage() {

    const dispatch = useAppDispatch();
    const { isProductLoading, productData, hasProductError } = useAppSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(fetchAllProduct(true)).unwrap()
            .then((res: any) => {
                // console.log('Response for fetching all products', res);
            })
            .catch((err: any) => {
                console.log('Error occured', err);
                getSweetAlert('Oops!', 'Something went wrong', "error");
            })
    }, []);

    const clearTrash = () => {
        dispatch(deleteTrashProductData())
            .then(res => {
                console.log('Response for delete trash data', res);

                if (res?.meta?.requestStatus == 'fulfilled') {
                    dispatch(fetchAllProduct(true)).unwrap()

                }
            })
            .catch(err => {
                console.log('Error occured', err);
                getSweetAlert('Oops!', 'Something went wrong', "error");
            })
    }

    // console.log('Received all product data', productData);

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-600">Trash</h1>
                <button className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer"
                    onClick={() => clearTrash()}>Clear Trash</button>
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
                            <img src="/trash.png" alt="#bin" className="h-30 mt-40 mx-auto" />
                            <p className="text-center text-gray-500 text-[14px] my-3">No trash available</p>
                        </>
                    ))}
        </>
    );
}