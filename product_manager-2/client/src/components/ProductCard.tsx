"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IndianRupee, Loader2, RefreshCcw, Trash2 } from "lucide-react";
import { Product } from "@/interface/Product";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { deleteProductData, fetchAllProduct, updateProduct } from "@/redux/slice/productSlice";
import getSweetAlert from "@/utils/alert/sweetAlert";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store/store";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const imageSrc = product?.image && product.image.trim() !== "" ? product.image : "/demo.jpg";

    const name = product?.name ?? "N/A";
    const description = product?.description ?? "N/A";

    const dispatch = useAppDispatch();
    const { isProductLoading } = useAppSelector((state: RootState) => state.product);

    const handleDelete = async (productId: string) => {
        try {
            await dispatch(deleteProductData(productId))
                .then(res => {
                    if (res.meta.requestStatus == "fulfilled") {
                        dispatch(fetchAllProduct(true)).unwrap()
                        getSweetAlert("Success", "Product permanently deleted successfully", "success");
                    }
                })
                .catch(err => {
                    getSweetAlert("Error", "Something went wrong", "error");
                })

        } catch {
            getSweetAlert("Error", "Something went wrong", "error");
        }
    };

    const handleMoveFromTrash = async (product: Product) => {
        try {
            const { _id: productId, ...productObj } = product;
            dispatch(updateProduct({ productId, productObj: { ...productObj, isDeleted: false } }))
                .then(res => {
                    if (res.meta.requestStatus == "fulfilled") {
                        dispatch(fetchAllProduct(true)).unwrap()
                        toast.success("Product reload successfully");
                    }
                })
                .catch(err => {
                    // console.log('Error occured',err);
                    toast.error("Something went wrong");
                })

        } catch {
            getSweetAlert("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden">

            {/* Image */}
            <div className="relative bg-gray-50 p-4">
                <span className="absolute top-3 left-3 text-[10px] uppercase bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full z-10">
                    {product?.brand ?? "N/A"}
                </span>

                <Image
                    src={imageSrc} alt={name} width={200} height={200}
                    className="h-32 mx-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="px-4 py-3 space-y-1">
                <h3 className="text-sm font-medium text-gray-900 leading-snug">
                    {name.length > 20 ? name.slice(0, 20) + "..." : name}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                    {description.length > 65 ? description.slice(0, 65) + "..." : description}
                </p>

                <div className="flex items-center justify-between pt-2">
                    <p className="text-sm font-semibold text-gray-900">
                        <IndianRupee className="inline w-4 h-4 mb-0.5" />
                        {product?.price ?? 0}
                    </p>
                </div>
            </div>

            {/* Action */}
            <div className="px-4 pb-4">
                {!product?.isDeleted ?
                    <Link
                        href={`/products/details/${product?._id}`}
                        className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase py-2 rounded-xl transition"
                    >
                        View Details
                    </Link>
                    : (
                        <span className="flex justify-between">
                            <button
                                onClick={() => handleMoveFromTrash(product)} disabled={isProductLoading}
                                className={`px-3 text-white py-2 rounded-lg hover:bg-green-700 ${isProductLoading ? 'bg-green-700 cursor-not-allowed' : 'bg-green-600 cursor-pointer'}`}
                            ><RefreshCcw className={`inline w-4 h-4 mb-1 mr-1 ${isProductLoading ? 'animate-spin' : ''}`} /> Reload </button>
                            <button
                                onClick={() => handleDelete(product?._id)} disabled={isProductLoading}
                                className={`px-3 text-white py-2 rounded-lg hover:bg-red-700 ${isProductLoading ? 'bg-red-700 cursor-not-allowed' : 'bg-red-600 cursor-pointer'}`}
                            > {isProductLoading ? <Loader2 className="inline w-4 h-4 mb-1 mr-1 animate-spin" /> : <Trash2 className="inline w-4 h-4 mb-1 mr-1" />} Delete </button>
                        </span>
                    )}
            </div>
        </div>
    );
};

export default ProductCard;
