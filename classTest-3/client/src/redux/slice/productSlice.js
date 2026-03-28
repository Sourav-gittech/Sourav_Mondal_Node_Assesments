import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance/axiosInstance";
import { endPoint_Product, endPoint_Product_Delete } from "../../api/apiUrl/apiUrl";

export const addProductSlice = createAsyncThunk("productSlice/addProductSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for adding product', data);

            const res = await axiosInstance.post(endPoint_Product, data);
            // console.log('Response for adding product', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const fetchAllProductSlice = createAsyncThunk("productSlice/fetchAllProductSlice",
    async (_, { rejectWithValue }) => {
        try {

            const res = await axiosInstance.get(endPoint_Product);
            // console.log('Response for fetching all products', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const updateProductSlice = createAsyncThunk("productSlice/updateProductSlice",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for updating product', id, data);

            const res = await axiosInstance.put(`${endPoint_Product}${id}`, data);
            // console.log('Response for updating product details', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)
export const deleteProductSlice = createAsyncThunk("productSlice/deleteProductSlice",
    async (id, { rejectWithValue }) => {
        try {
            // console.log('Received id in slice for deleting product', id);

            const res = await axiosInstance.delete(`${endPoint_Product_Delete}${id}`);
            // console.log('Response for deleting product', res);

            return id;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const initialState = {
    isProductLoading: false,
    productData: [],
    hasProductError: null
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder.addCase(addProductSlice.pending, (state, action) => {
            state.isProductLoading = true;
        })
        builder.addCase(addProductSlice.fulfilled, (state, action) => {
            state.isProductLoading = false;
            state.productData.push(action.payload.data);
        })
        builder.addCase(addProductSlice.rejected, (state, action) => {
            state.isProductLoading = false;
            state.hasProductError = action.error.message;
        })

        builder.addCase(fetchAllProductSlice.pending, (state, action) => {
            state.isProductLoading = true;
        })
        builder.addCase(fetchAllProductSlice.fulfilled, (state, action) => {
            state.isProductLoading = false;
            state.productData = action.payload.data;
        })
        builder.addCase(fetchAllProductSlice.rejected, (state, action) => {
            state.isProductLoading = false;
            state.hasProductError = action.error.message;
        })

        builder.addCase(updateProductSlice.pending, (state, action) => {
            state.isProductLoading = true;
        })
        builder.addCase(updateProductSlice.fulfilled, (state, action) => {
            state.isProductLoading = false;
            state.productData = action.payload;
        })
        builder.addCase(updateProductSlice.rejected, (state, action) => {
            state.isProductLoading = false;
            state.hasProductError = action.error.message;
        })

        builder.addCase(deleteProductSlice.pending, (state, action) => {
            state.isProductLoading = true;
        })
        builder.addCase(deleteProductSlice.fulfilled, (state, action) => {
            state.isProductLoading = false;
            state.productData.push(action.payload.data);
        })
        builder.addCase(deleteProductSlice.rejected, (state, action) => {
            state.isProductLoading = false;
            state.hasProductError = action.error.message;
        })
    }
});

export default productSlice.reducer;