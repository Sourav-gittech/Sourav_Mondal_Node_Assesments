"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";
import { useAppDispatch } from "@/redux/store/hooks";
import { fetchAllProduct, fetchProductBySearch } from "@/redux/slice/productSlice";
import { useRouter } from "next/navigation";

const NavbarSection: React.FC = () => {

    const [query, setQuery] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (query == '') {
            router.push("/products");
            dispatch(fetchAllProduct(false));
        }
    }, [dispatch, query]);

    return (
        <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-end">

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search
                        className="absolute left-3 top-2.5 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => {
                            const value = e.target.value;
                            setQuery(value);
                            router.push("/products");
                            dispatch(fetchProductBySearch({ search: value, status: false }));
                        }}
                        className="pl-10 pr-4 py-2 border border-blue-500 rounded-lg text-sm focus:outline-none text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Notification */}
                <button className="p-2 rounded-lg text-gray-400 hover:bg-blue-600 hover:text-gray-100 cursor-pointer">
                    <Bell size={20} />
                </button>

                {/* Add Product */}
                <Link
                    href="/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 mr-5"
                >
                    <Plus className="inline mb-1 h-4 w-4" /> Add Product
                </Link>
            </div>
        </header>
    );
};

export default NavbarSection;
