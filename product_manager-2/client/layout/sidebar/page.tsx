"use client";

import React, { useEffect, useState } from "react";
import { House, ShoppingBag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store/hooks";
import {
    fetchAllProduct,
    fetchProductBySize,
    fetchProductByBrand,
    fetchProductByColor,
    fetchProductByPrice,
} from "@/redux/slice/productSlice";

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const colors = ["White", "Purple", "Blue", "Black", "Red", "Green", "Grey", "Maroon"];
const brands = ["Monte Carlo", "Allen Solly", "Adidas", "Puma"];

const SidebarSection: React.FC = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const LOW_PRICE = 500;
    const MAX_PRICE = 10000;

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [price, setPrice] = useState(MAX_PRICE);

    const [returnFromTrash, setReturnFromTrash] = useState<boolean>(false);

    useEffect(() => {
        if (returnFromTrash) {
            setSelectedSize(null);
            setSelectedColor(null);
            setSelectedBrand(null);
            setPrice(2500);
        }
    }, [returnFromTrash]);

    return (
        <aside className="w-64 bg-white border-r border-gray-300 flex flex-col h-screen">

            {/* Brand */}
            <div className="h-16 flex items-center justify-center gap-2 text-lg font-bold text-blue-600 bg-blue-50 border-b border-gray-300">
                <ShoppingBag className="w-5 h-5" />
                <span>Shopsy</span>
            </div>

            {/* Profile */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                <img
                    src="/user.png"
                    alt="user"
                    className="w-12 h-12 border rounded-full border-gray-400"
                />
                <div>
                    <div className="text-sm font-semibold text-gray-800">
                        Harry Porter
                    </div>
                    <div className="text-xs text-gray-500 cursor-pointer">
                        View Profile
                    </div>
                </div>
            </div>

            <div>
                <p className="text-gray-600 mx-5 mt-4 pl-3 hover:bg-blue-300 hover:text-white rounded-2xl py-1 cursor-pointer" onClick={() => {
                    router.push("/products");
                    setReturnFromTrash(false);
                }}>
                    <House className="inline mb-1 mr-1 w-4 h-4" />Home</p>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto p-5 space-y-7">

                {/* Size */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                        Size
                    </h3>
                    <div className="space-y-2">
                        {sizes.map((size) => (
                            <label
                                key={size}
                                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                            >
                                <input type="checkbox" className={`accent-blue-600 ${returnFromTrash ? 'cursor-not-allowed' : ''}`} checked={selectedSize === size} disabled={returnFromTrash}
                                    onChange={() => {
                                        setSelectedSize(size);
                                        dispatch(fetchProductBySize({ size, status: false }));
                                    }} />
                                {size}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Color */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                        Color
                    </h3>
                    <div className="space-y-2">
                        {colors.map((color) => (
                            <label
                                key={color}
                                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                            >
                                <input type="checkbox" className={`accent-blue-600 ${returnFromTrash ? 'cursor-not-allowed' : ''}`} disabled={returnFromTrash}
                                    checked={selectedColor === color}
                                    onChange={() => {
                                        setSelectedColor(color);
                                        dispatch(fetchProductByColor({ color, status: false }));
                                    }} />
                                {color}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Brand (FIXED) */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                        Brand
                    </h3>
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <label
                                key={brand}
                                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                            >
                                <input type="checkbox" className={`accent-blue-600 ${returnFromTrash ? 'cursor-not-allowed' : ''}`} checked={selectedBrand === brand} disabled={returnFromTrash}
                                    onChange={() => {
                                        setSelectedBrand(brand);
                                        dispatch(fetchProductByBrand({ brand, status: false }));
                                    }} />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase">
                        Price
                    </h3>
                    <input
                        type="range" disabled={returnFromTrash}
                        min={LOW_PRICE}
                        max={MAX_PRICE}
                        value={price}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setPrice(value);
                            dispatch(fetchProductByPrice({ min: LOW_PRICE, max: value, status: false }));
                        }}
                        className={`w-full accent-blue-600 ${returnFromTrash ? 'cursor-not-allowed' : ''}`}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>₹{LOW_PRICE}</span>
                        <span>₹{price}</span>
                    </div>
                </div>

                <button disabled={returnFromTrash}
                    onClick={() => {
                        setSelectedSize(null);
                        setSelectedColor(null);
                        setSelectedBrand(null);
                        setPrice(2500);
                        dispatch(fetchAllProduct(false));
                    }}
                    className={`w-full bg-gray-200 text-black cursor-pointer hover:bg-gray-300 text-sm py-2 rounded ${returnFromTrash ? 'cursor-not-allowed' : ''}`}
                >
                    Clear Filters
                </button>

            </div>
            <div>
                <p className="text-gray-600 mx-5 mt-4 pl-3 hover:bg-red-500 hover:text-white rounded-2xl py-2 cursor-pointer" onClick={() => {
                    setReturnFromTrash(true);
                    router.push("/products/trash");
                }}>
                    <Trash className="inline mb-1 mr-1 w-4 h-4" />Trash</p>
            </div>

        </aside>
    );
};

export default SidebarSection;
