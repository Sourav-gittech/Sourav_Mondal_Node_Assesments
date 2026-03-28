import Modal from "../common/Modal";

const AddProductModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Product">
      <form className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Product Name</label>
          <input
            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Product name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Category</label>
          <input
            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded"
            placeholder="Category"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Price</label>
          <input
            type="number"
            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded"
            placeholder="Price"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Image URL</label>
          <input
            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Description</label>
          <textarea
            rows="3"
            className="w-full mt-1 px-3 py-2 bg-[#020617] border border-blue-500/40 rounded"
            placeholder="Product description"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-black rounded-md font-medium"
        >
          Add Product
        </button>
      </form>
    </Modal>
  );
};

export default AddProductModal;