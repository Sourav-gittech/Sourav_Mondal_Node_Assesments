const ViewProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-800 border border-slate-700 rounded-lg w-[520px] h-[580px] overflow-y-auto p-6 custom-scrollbar">
                <h2 className="text-xl font-bold text-blue-400 mb-4">
                    Product Details
                </h2>

                {product.product_img && (
                    <img
                        src={product?.product_img_url}
                        alt={product?.name}
                        className="w-full h-48 object-cover rounded border border-slate-600 mb-4"
                    />
                )}

                <div className="space-y-2 text-gray-300">
                    <p><b>Name:</b> {product?.name ?? 'N/A'}</p>
                    <p><b>Description:</b> {product?.description ?? 'N/A'}</p>
                    <p><b>Category:</b> {product?.category ?? 'N/A'}</p>
                    <p><b>Price:</b> ₹{product?.price ?? 0}</p>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewProductModal;