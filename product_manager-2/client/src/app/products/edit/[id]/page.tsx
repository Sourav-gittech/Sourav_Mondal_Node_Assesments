"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

import { SIZES, COLORS, BRANDS } from "@/utils/constants";
import { updateProduct } from "@/redux/slice/productSlice";
import { useSpecificProductDetails } from "@/tanstack/query/useSpecificProductDetails";
import getSweetAlert from "@/utils/alert/sweetAlert";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

type FormValues = {
    name: string;
    brand: string;
    price: number;
    image: string;
    description: string;
    size: string[];
    color: string[];
};

export default function UpdateProductForm() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { isProductLoading } = useAppSelector((state: any) => state.product);
    const { data, isLoading } = useSpecificProductDetails(id);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: { size: [], color: [] }
    });

    const sizes = watch("size") || [];
    const colors = watch("color") || [];

    useEffect(() => {
        if (data?.data) {
            reset({
                name: data.data.name,
                brand: data.data.brand,
                price: data.data.price,
                image: data.data.image,
                description: data.data.description,
                size: data.data.size || [],
                color: data.data.color || [],
            });
        }
    }, [data, reset]);

    const onSubmit = async (formData: FormValues) => {
        if (formData.size.length == 0) {
            toast.info("Size is required");
        }
        else if (formData.color.length == 0) {
            toast.info("Color is required");
        }
        else {
            const res = await dispatch(
                updateProduct({ productId: id, productObj: formData }) as any
            );

            if (res.meta.requestStatus === "fulfilled") {
                getSweetAlert("Success", "Product updated successfully", "success");
                router.push("/products");
            } else {
                getSweetAlert("Oops!", "Something went wrong", "error");
            }
        }
    };

    if (isLoading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <form noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8 space-y-8"
        >
            <h1 className="text-2xl font-semibold text-gray-900">
                Update Product
            </h1>

            {/* ROW 1 → NAME + BRAND */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Product Name
                    </label>
                    <input disabled
                        {...register("name")}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 outline-none text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Brand
                    </label>
                    <select
                        {...register("brand", { required: "Brand is required" })}
                        className="w-full border rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-gray-400 outline-none text-black"
                    >
                        <option value="">Select brand</option>
                        {BRANDS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                    {errors.brand && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.brand.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Image URL
                    </label>
                    <input
                        type="url"
                        {...register("image", {
                            required: "Image URL is required",
                            pattern: {
                                value: /^(https?:\/\/).+/,
                                message: "Enter a valid URL"
                            }
                        })}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 outline-none text-black"
                    />
                    {errors.image && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Price (₹)
                    </label>
                    <input
                        type="number"
                        min={0}
                        step="1"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            validate: (value) =>
                                value > 0 || "Enter a valid price",
                        })}
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 text-black outline-none"
                    />

                    {errors.price && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.price.message}
                        </p>
                    )}
                </div>
            </div>

            {/* DESCRIPTION */}
            <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Description
                </label>
                <textarea
                    rows={4}
                    {...register("description", {
                        required: "Description is required",
                        minLength: {
                            value: 10,
                            message: "Minimum 10 characters required"
                        }
                    })}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 text-black outline-none"
                />
                {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* SIZES */}
            <div>
                <label className="block text-sm text-gray-600 mb-2">
                    Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                    {SIZES.map((s, index) => (
                        <button
                            key={`size-${s}-${index}`}
                            type="button"
                            onClick={() =>
                                setValue("size", sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s],
                                    { shouldValidate: true }
                                )
                            }
                            className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${sizes.includes(s)
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-gray-100"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* COLORS */}
            <div>
                <label className="block text-sm text-gray-600 mb-2">
                    Colors
                </label>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                        <button
                            key={c} type="button"
                            onClick={() =>
                                setValue(
                                    "color", colors.includes(c) ? colors.filter((x) => x !== c) : [...colors, c],
                                    { shouldValidate: true }
                                )
                            }
                            className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${colors.includes(c)
                                ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* SUBMIT */}
            <button
                disabled={isProductLoading}
                className={`w-full text-white py-4 rounded-xl font-medium hover:opacity-90 transition 
                    ${isProductLoading ? 'cursor-not-allowed bg-blue-600' : 'cursor-pointer bg-blue-700'}`}
            >
                {isProductLoading ? <Loader2 className="animate-spin w-4 h-4 mb-1 mr-2 inline" /> : ''}
                Update Product
            </button>
        </form>
    );
}
