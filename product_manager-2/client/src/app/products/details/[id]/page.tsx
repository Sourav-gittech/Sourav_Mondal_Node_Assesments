"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import DeleteProductModal from "@/components/modal/DeleteProductModal";
import getSweetAlert from "@/utils/alert/sweetAlert";
import { deleteProductData, updateProduct } from "@/redux/slice/productSlice";
import { useSpecificProductDetails } from "@/tanstack/query/useSpecificProductDetails";
import { Product } from "@/interface/Product";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { toast } from "react-toastify";

const COLOR_CLASS_MAP: Record<string, string> = {
    black: "text-black",
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-red-300",
    white: "text-gray-500",
    maroon: "text-red-800",
    red: "text-red-600",
    grey: "text-gray-600",
};

export default function ProductDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useAppDispatch<AppDispatch>();

    const [openDelete, setOpenDelete] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

    const { isProductLoading } = useAppSelector((state: RootState) => state.product);

    const { isLoading, data: productData } = useSpecificProductDetails(params?.id);

    const handleMoveToTrash = async (product: Product) => {
        try {
            const { _id: productId, ...productObj } = product;
            // await dispatch(deleteProductData(productId)).unwrap();
            dispatch(updateProduct({ productId, productObj: { ...productObj, isDeleted: true } }))
                .then(res => {
                    if (res.meta.requestStatus == "fulfilled") {
                        setOpenDelete(false);
                        toast.success("Product moved to trash successfully");
                        router.push("/products");
                    }
                })
                .catch(err => {
                    getSweetAlert("Error", "Something went wrong", "error");
                })

        } catch {
            getSweetAlert("Error", "Something went wrong", "error");
        }
    };

    if (isLoading) {
        return (
            <Loader2 className="animate-spin w-12 h-12 text-gray-400 mx-auto my-20" />
        );
    }

    if (!productData?.data) {
        return <p className="text-center my-20">No product found</p>;
    }

    const product = productData.data;

    // console.log('Product details',product);

    return (
        <>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* BACK */}
                <Link
                    href="/products"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                    <ArrowLeft size={16} />
                    Back to Products
                </Link>

                {/* CARD */}
                <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* IMAGE */}
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full rounded-lg object-contain bg-gray-50 h-[450px]"
                        />
                        <span className="absolute text-white top-0 uppercase text-[12px] px-3 py-1 bg-blue-500 rounded-2xl">{product?.brand ?? 'N/A'}</span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-between">
                        <div className="space-y-4">
                            <h1 className="text-2xl font-semibold text-gray-500">
                                {product.name ?? 'N/A'}
                            </h1>

                            <div className="text-2xl font-bold text-blue-600">
                                ₹ {product.price.toLocaleString() ?? 'N/A'}
                            </div>

                            <p className="text-sm text-gray-700">
                                {product.description ?? 'N/A'}
                            </p>

                            {/* INFO */}
                            <div className="border-t pt-4 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Brand</span>
                                    <span className="font-medium text-gray-500">
                                        {product.brand ?? 'N/A'}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Sizes</span>
                                    <span>
                                        {product.size.map((s: string, index: number) => (
                                            <span
                                                key={`size-${s}-${index}`}
                                                className="inline-block px-2 py-1 bg-blue-500 text-white rounded mx-1"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Colors</span>
                                    <span>
                                        {product.color.map((c: string) => (
                                            <span
                                                key={c}
                                                className={`mx-1 ${COLOR_CLASS_MAP[c.toLowerCase()] ??
                                                    "text-gray-600"
                                                    }`}
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-4 mt-6">
                            <Link
                                href={`/products/edit/${product._id}`}
                                className="w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                            >
                                Edit Product
                            </Link>

                            <button
                                onClick={() => {
                                    setOpenDelete(true);
                                    setDeleteProduct(product);
                                }}
                                className="w-full bg-red-600 text-white cursor-pointer py-3 rounded-lg hover:bg-red-700"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* DELETE MODAL */}
            {openDelete && deleteProduct && (
                <DeleteProductModal
                    open={openDelete}
                    productName={deleteProduct.name}
                    onClose={() => setOpenDelete(false)}
                    onConfirm={() => handleMoveToTrash(deleteProduct)}
                    isProductLoading={isProductLoading}
                />
            )}
        </>
    );
}