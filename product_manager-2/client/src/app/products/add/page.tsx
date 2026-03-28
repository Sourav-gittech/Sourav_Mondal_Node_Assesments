"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { addProduct } from "@/redux/slice/productSlice";
import getSweetAlert from "@/utils/alert/sweetAlert";
import { SIZES, COLORS, BRANDS } from "@/utils/constants";
import { Product } from "@/interface/Product";
import { input, label, chip, chipActive, chipInactive } from "@/utils/styles/productForm";
import { toast } from "react-toastify";

const AddProductForm = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const { isProductLoading } = useSelector((s: any) => s.product);

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Product>({
        defaultValues: {
            name: "",
            brand: "",
            price: 0,
            image: "",
            description: "",
            size: [],
            color: [],
        },
    });

    const sizes = watch("size");
    const colors = watch("color");

    const onSubmit = (data: Product) => {
        if (data.size.length == 0) {
            toast.info("Size is required");
        }
        else if (data.color.length == 0) {
            toast.info("Color is required");
        }
        else {
            dispatch(addProduct(data))
                .unwrap()
                .then(() => {
                    getSweetAlert("Success", "Product added successfully", "success");
                    reset();
                    router.push("/products");
                })
                .catch(() =>
                    getSweetAlert("Error", "Failed to add product", "error")
                );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl bg-white rounded-2xl shadow p-8 space-y-8 mx-auto"
        >
            <h1 className="text-2xl font-semibold text-gray-900">
                Add Product
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={label}>Product Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className={input}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className={label}>Brand</label>
                    <select
                        {...register("brand", { required: "Brand is required" })}
                        className={input}
                    >
                        <option value="">Select brand</option>
                        {BRANDS.map((b) => (
                            <option key={b}>{b}</option>
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
                    <label className={label}>Image URL</label>
                    <input
                        type="url"
                        {...register("image", {
                            required: "Image URL is required",
                            pattern: {
                                value: /^(https?:\/\/).+/,
                                message: "Enter a valid URL"
                            }
                        })}
                        className={input}
                    />
                    {errors.image && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className={label}>Price (₹)</label>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            validate: (value) =>
                                value > 0 || "Enter a valid price",
                        })}
                        className={input}
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
                <label className={label}>Description</label>
                <textarea
                    rows={4}
                    {...register("description", {
                        required: "Description is required",
                        minLength: {
                            value: 10,
                            message: "Minimum 10 characters required"
                        }
                    })}
                    className={input}
                />
                {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* SIZES */}
            <div>
                <label className={label}>Sizes</label>
                <div className="flex flex-wrap gap-3">
                    {SIZES.map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() =>
                                setValue(
                                    "size", sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s]
                                )
                            }
                            className={`${chip} ${sizes.includes(s) ? chipActive : chipInactive
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* COLORS */}
            <div>
                <label className={label}>Colors</label>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                        <button
                            key={c} type="button"
                            onClick={() =>
                                setValue(
                                    "color",
                                    colors.includes(c) ? colors.filter((x) => x !== c) : [...colors, c]
                                )
                            }
                            className={`${chip} ${colors.includes(c) ? chipActive : chipInactive
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* SUBMIT */}
            <button
                disabled={isProductLoading}
                className={`w-full text-white py-4 rounded-xl font-medium hover:opacity-90 transition 
                    ${isProductLoading ? 'bg-blue-600 cursor-not-allowed' : 'bg-blue-700 cursor-pointer'}`}
            >
                {isProductLoading ? <Loader2 className="animate-spin w-4 h-4 mb-1 mr-2 inline" /> : ''}
                Add Product
            </button>
        </form>

    );
};

export default AddProductForm;