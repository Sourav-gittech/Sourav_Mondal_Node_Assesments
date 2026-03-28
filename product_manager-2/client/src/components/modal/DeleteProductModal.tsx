"use client";

import { Loader2, Trash2, X } from "lucide-react";

interface DeleteProductModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName?: string;
    isProductLoading?: boolean;
}

const DeleteProductModal = ({ open, onClose, onConfirm, productName, isProductLoading = false }: DeleteProductModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
                {/* Close */}
                <button
                    onClick={onClose}
                    disabled={isProductLoading}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    <X size={18} />
                </button>

                {/* Icon */}
                <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                    <Trash2 />
                </div>

                {/* Content */}
                <h2 className="text-lg font-semibold text-center text-gray-500">
                    Delete Product
                </h2>

                <p className="text-sm text-gray-600 text-center mt-2">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-800">
                        {productName}
                    </span>
                    ?
                </p>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isProductLoading}
                        className="w-full py-2 rounded-lg cursor-pointer border text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isProductLoading}
                        className="w-full py-2 rounded-lg cursor-pointer text-white bg-red-600 hover:bg-red-700 disabled:bg-red-700 disabled:cursor-not-allowed"
                    >
                        {isProductLoading && (
                            <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
                        )}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;
