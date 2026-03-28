const ProductCard = ({ product, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-[#020617] border border-blue-500/30 rounded-xl shadow-lg overflow-hidden">
      <img
        src={product.product_img_url}
        alt={product.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.category}</p>
        <p className="text-green-400 font-bold mt-1">
          ₹{product.price}
        </p>

        <div className="flex justify-between mt-4 text-sm">
          <button
            onClick={onView}
            className="text-blue-400 hover:underline"
          >
            View
          </button>
          <button
            onClick={onEdit}
            className="text-green-400 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;