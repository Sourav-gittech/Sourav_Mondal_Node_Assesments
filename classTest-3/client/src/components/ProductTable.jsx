import { use, useEffect } from "react";
import ProductRow from "./ProductRow";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductSlice } from "../redux/slice/productSlice";

const ProductTable = ({ onView, onEdit, onDelete }) => {

    const dispatch = useDispatch();
    const { isProductLoading, productData, hasProductError } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchAllProductSlice())
            .then(res => {
                // console.log('Response for fetching all products', res);
            })
            .catch(err => {
                console.log('Error occured', err);
            })
    }, [dispatch]);

    // console.log('All available products', productData);

    return (
        <div className="overflow-x-auto bg-slate-800 border border-slate-700 rounded mx-40">
            <table className="w-full text-left text-gray-300">
                <thead className="bg-slate-900 text-gray-200">
                    <tr className="text-center">
                        <th className="px-4 py-3">Product Name</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {productData?.length > 0 ? (
                        productData?.map(product => (
                            <ProductRow
                                key={product?._id}
                                product={product}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-6 text-gray-400">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;