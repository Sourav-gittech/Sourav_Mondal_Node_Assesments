const ProductRow = ({ product, onView, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-slate-700 hover:bg-slate-700/40 text-center">
            <td className="px-4 py-3">{(product?.name?.length > 20 ? product?.name?.slice(0, 20) + '...' : product?.name) ?? 'N/A'}</td>
            <td className="px-4 py-3 text-green-400">₹{product?.price ?? 0}</td>
            <td className="px-4 py-3">{product?.category ?? 'N/A'}</td>

            <td className="px-4 py-3 flex gap-2 justify-center">
                <button
                    onClick={() => onView(product)}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-1 rounded text-sm cursor-pointer"
                >
                    View
                </button>

                <button
                    onClick={() => onEdit(product)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm cursor-pointer"
                >
                    Update
                </button>

                <button
                    onClick={() => onDelete(product?._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm cursor-pointer"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ProductRow;