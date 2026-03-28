import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { addProductSlice, fetchAllProductSlice, updateProductSlice } from "../../redux/slice/productSlice";
import { useEffect } from "react";

const AddOrUpdateProductModal = ({ editProduct, onClose, setEditProduct }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate(),
        { isProductLoading, productData } = useSelector(state => state?.product);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    // if (!isOpen) return null;

    useEffect(() => {
        if (editProduct) {
            reset({
                name: editProduct?.name,
                description: editProduct?.description,
                price: editProduct?.price,
                category: editProduct?.category
            })
        }
    }, [editProduct, reset]);

    const submitHandler = (data) => {
        // console.log("Validated product data", data);

        const file = data?.product_img?.[0];
        if (!editProduct && !file) return;

        if (file && !file.type.startsWith("image/")) {
            Swal.fire("Invalid File", "Only images are allowed", "warning");
            return;
        }

        const formData = new FormData();
        formData.append('name', data?.name);
        formData.append('description', data?.description);
        formData.append('price', data?.price);
        formData.append('category', data?.category);
        formData.append('product-img', data?.product_img?.[0]);

        dispatch(editProduct ? updateProductSlice({ id: editProduct?._id, data: formData }) : addProductSlice(formData))
            .then(res => {
                // console.log(`Response for ${editProduct ? 'updating' : 'adding'} product`, res);

                if (res.meta.requestStatus === "fulfilled") {
                    toast.success(`Product ${editProduct ? 'updated' : 'added'} successfully`);
                    setEditProduct(null);
                    dispatch(fetchAllProductSlice());
                    onClose();
                    navigate("/");
                } else {
                    toast.error(res?.payload?.message || "Something went wrong");
                }
            })
            .catch((err) => {
                Swal.fire("Error", err.message, "error");
            });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg w-[420px] p-6">
                <h2 className="text-xl font-bold text-green-400 mb-4">
                    {editProduct ? 'Update' : 'Add'} Product
                </h2>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
                    {/* Name */}
                    <input
                        placeholder="Product Name"
                        className="input"
                        {...register("name", {
                            required: "Product name is required",
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name.message}</p>
                    )}

                    {/* Description */}
                    <textarea
                        placeholder="Description"
                        className="input h-20 custom-scrollbar"
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 10,
                                message: "Minimum 10 characters required",
                            },
                        })}
                    />
                    {errors.description && (
                        <p className="text-red-400 text-sm">
                            {errors.description.message}
                        </p>
                    )}

                    {/* Category */}
                    <input
                        placeholder="Category"
                        className="input"
                        {...register("category", {
                            required: "Category is required",
                        })}
                    />
                    {errors.category && (
                        <p className="text-red-400 text-sm">
                            {errors.category.message}
                        </p>
                    )}

                    {/* Price */}
                    <input
                        placeholder="Price"
                        className="input"
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: {
                                value: 1,
                                message: "Price must be greater than 0",
                            },
                        })}
                    />
                    {errors.price && (
                        <p className="text-red-400 text-sm">{errors.price.message}</p>
                    )}

                    {/* Image */}
                    <input
                        type="file"
                        accept="image/*"
                        className="text-gray-300"
                        {...register("product_img")} />

                    {errors.product_img && (
                        <p className="text-red-400 text-sm">
                            Product image is required
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-green-600 hover:bg-green-700 rounded ${isProductLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {isProductLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOrUpdateProductModal;