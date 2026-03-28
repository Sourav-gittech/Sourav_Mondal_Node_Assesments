import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import AddOrUpdateProductModal from "../components/modal/AddOrUpdateProductModal";
import ViewProductModal from "../components/modal/ViewProductModal";
import { useDispatch, useSelector } from 'react-redux';
import { profileSlice } from "../redux/slice/userSlice";
import { deleteProductSlice, fetchAllProductSlice } from "../redux/slice/productSlice";
import toast from "react-hot-toast";

const Dashboard = () => {

  const [editProduct, setEditProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  const dispatch = useDispatch();
  const { isProfileLoading, profileData, hasProfileError } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(profileSlice())
      .then(res => {
        // console.log("Response for fetching profile", res);
      })
      .catch(err => {
        console.log('Error occured', err);
      })
  }, []);

  const deleteHandler = (id) => {

    dispatch(deleteProductSlice(id))
      .then(res => {
        // console.log('Response for deleting the product', res);

        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchAllProductSlice());
          toast.success("Product deleted successfully");
        }
        else {
          toast.error(res?.payload?.message);
        }
      })
      .catch(err => {
        console.log('Error occured', res);
      })
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Dashboard</h1>
          <p className="text-gray-300">
            {profileData && <>Welcome <span className="text-green-400">{profileData?.data?.name},
              {profileData?.data?.role?.charAt(0)?.toUpperCase() + profileData?.data?.role?.slice(1)?.toLowerCase()}</span></>}
          </p>
        </div>

        {profileData && <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded cursor-pointer"
        >
          + Add Product
        </button>}
      </div>

      <ProductTable
        onView={product => setViewProduct(product)}
        onEdit={product => { setEditProduct(product); setShowAddModal(true) }}
        onDelete={deleteHandler}
      />

      {showAddModal &&
        <AddOrUpdateProductModal
          editProduct={editProduct} setEditProduct={setEditProduct}
          onClose={() => setShowAddModal(false)}
        />}

      <ViewProductModal
        product={viewProduct}
        onClose={() => setViewProduct(null)}
      />
    </div>
  );
};

export default Dashboard;