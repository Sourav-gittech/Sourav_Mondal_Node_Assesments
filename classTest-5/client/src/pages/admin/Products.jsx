import { useState } from "react";
import Modal from "../../components/common/Modal";
import ProductCard from "../../components/admin/products/ProductCard";

const Products = () => {

    const demoProducts = [
        {
            _id: 1,
            name: "Laptop",
            category: "Electronics",
            price: 55000,
            product_img_url: "https://via.placeholder.com/300",
            description: "High performance laptop",
        },
        {
            _id: 2,
            name: "Headphones",
            category: "Accessories",
            price: 3000,
            product_img_url: "https://via.placeholder.com/300",
            description: "Noise cancelling headphones",
        },
    ];

    const [products, setProducts] = useState(demoProducts);
    const [selected, setSelected] = useState(null);
    const [modalType, setModalType] = useState(null);

    const openModal = (type, product = null) => {
        setSelected(product);
        setModalType(type);
    };

    const closeModal = () => {
        setSelected(null);
        setModalType(null);
    };

    return (
        <>
            <div className="flex justify-between mb-5">
                <h2 className="text-xl text-blue-400">Products</h2>
                <button
                    onClick={() => openModal("add")}
                    className="px-4 py-2 bg-green-500 text-black rounded"
                >
                    Add Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <ProductCard product={p} onView={onView} onEdit={onEdit} onDelete={onDelete}/>
                ))}
            </div>

            {/* VIEW MODAL */}
            <Modal isOpen={modalType === "view"} onClose={closeModal} title="View Product">
                {selected && (
                    <>
                        <p><strong>Name:</strong> {selected.name}</p>
                        <p><strong>Category:</strong> {selected.category}</p>
                        <p><strong>Price:</strong> ₹{selected.price}</p>
                        <p className="mt-2 text-gray-400">{selected.description}</p>
                    </>
                )}
            </Modal>

            {/* ADD / EDIT MODAL */}
            <Modal
                isOpen={modalType === "add" || modalType === "edit"}
                onClose={closeModal}
                title={modalType === "add" ? "Add Product" : "Update Product"}
            >
                <form className="space-y-3">
                    <input placeholder="Name" className="input" />
                    <input placeholder="Category" className="input" />
                    <input placeholder="Price" className="input" />
                    <textarea placeholder="Description" className="input" />
                    <button className="w-full py-2 bg-green-500 text-black rounded">
                        {modalType === "add" ? "Add Product" : "Update Product"}
                    </button>
                </form>
            </Modal>

            {/* DELETE MODAL */}
            <Modal isOpen={modalType === "delete"} onClose={closeModal} title="Confirm Delete">
                <p className="text-gray-400 mb-4">
                    Are you sure you want to delete <strong>{selected?.name}</strong>?
                </p>
                <div className="flex gap-3">
                    <button
                        className="flex-1 py-2 bg-red-500 text-black rounded"
                    >
                        Delete
                    </button>
                    <button
                        onClick={closeModal}
                        className="flex-1 py-2 border border-gray-500 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Products;