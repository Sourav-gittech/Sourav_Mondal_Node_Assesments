import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance/axiosInstance";
import {
    endPoint_add,
    endPoint_delete,
    endPoint_fetch_all,
    endPoint_fetch_specific,
    endPoint_fetch_specific_by_brand,
    endPoint_fetch_specific_by_color,
    endPoint_fetch_specific_by_price,
    endPoint_fetch_specific_by_search,
    endPoint_fetch_specific_by_size,
    endPoint_update
} from "@/api/apiUrl/apiUrl";
import { Product } from "@/interface/Product";
import { BrandFilter, ColorFilter, PriceFilter, SearchFilter, SizeFilter } from "@/interface/Filter";

interface ProductState {
    isProductLoading: boolean;
    productData: Product[];
    hasProductError: string | null;
}

interface ProductApiResponse {
    status: boolean;
    message: string;
    count: number;
    data: Product[];
}

export const fetchAllProduct = createAsyncThunk<Product[], boolean>("productSlice/fetchAllProduct",
    async (status) => {
        const res = await axiosInstance.get<ProductApiResponse>(`${endPoint_fetch_all}${status}`);
        // console.log('Response for fetching products', res);

        return res.data.data;
    }
);

export const fetchProductById = createAsyncThunk<Product, string>("productSlice/fetchProductById",
    async (productId) => {

        // console.log('Fetched product for category',category);

        const res = await axiosInstance.get<Product>(
            `${endPoint_fetch_specific}${productId}`
        );
        // console.log('Response for fetching category wise products', res);

        return res.data;
    }
);

export const fetchProductBySize = createAsyncThunk<Product[], SizeFilter>("productSlice/fetchProductBySize",
    async ({ size, status }) => {
        const res = await axiosInstance.get<ProductApiResponse>(
            `${endPoint_fetch_specific_by_size}${size}/${status}`
        );
        // console.log('Response for fetching category wise products', res);

        return res.data.data;
    }
);

export const fetchProductByBrand = createAsyncThunk<Product[], BrandFilter>("productSlice/fetchProductByBrand",
    async ({ brand, status }) => {
        const res = await axiosInstance.get<ProductApiResponse>(
            `${endPoint_fetch_specific_by_brand}${brand}/${status}`
        );
        // console.log('Response for fetching brand wise products', res);

        return res.data.data;
    }
);

export const fetchProductByColor = createAsyncThunk<Product[], ColorFilter>("productSlice/fetchProductByColor",
    async ({ color, status }) => {
        const res = await axiosInstance.get<ProductApiResponse>(
            `${endPoint_fetch_specific_by_color}${color}/${status}`
        );
        // console.log('Response for fetching color wise products', res);

        return res.data.data;
    }
);

export const fetchProductByPrice = createAsyncThunk<Product[], PriceFilter>("productSlice/fetchProductByPrice",
    async ({ min, max, status }) => {
        const res = await axiosInstance.get<ProductApiResponse>(
            `${endPoint_fetch_specific_by_price}${max}/${min}/${status}`
        );
        // console.log('Response for fetching price wise products', res);

        return res.data.data;
    }
);

export const fetchProductBySearch = createAsyncThunk<Product[], SearchFilter>("productSlice/fetchProductBySearch",
    async ({ search, status }) => {
        const res = await axiosInstance.get<ProductApiResponse>(
            `${endPoint_fetch_specific_by_search}${search}/${status}`
        );
        // console.log('Response for fetching search wise products', res);

        return res.data.data;
    }
);


export const addProduct = createAsyncThunk<Product, Omit<Product, "_id">>("productSlice/addProduct",
    async (productObj) => {

        // console.log('Data receive for adding data', productObj);
        const res = await axiosInstance.post<Product>(endPoint_add, productObj);
        // console.log('Response for adding new product', res);

        return res.data;
    }
);

export const updateProduct = createAsyncThunk<Product, { productId: string; productObj: Partial<Product> }>(
    "productSlice/updateProduct",
    async ({ productId, productObj }) => {

        // console.log('Data receive for updating data', productId, productObj);

        const res = await axiosInstance.patch<Product>(
            `${endPoint_update}${productId}`,
            productObj
        );
        // console.log('Response for updating product', res);

        return res.data;
    }
);

export const deleteProductData = createAsyncThunk<string, string>("productSlice/deleteProductData",
    async (productId) => {
        // console.log('Data receive for deleting data', productId);

        await axiosInstance.delete(`${endPoint_delete}${productId}`);
        // console.log('Response for deleting product', res);

        return productId;
    }
);

export const deleteTrashProductData = createAsyncThunk<null>("productSlice/deleteTrashProductData",
    async () => {
        await axiosInstance.delete(endPoint_delete);
        // console.log('Response for deleting trash product', res);

        return null;
    }
);


const initialState: ProductState = {
    isProductLoading: false,
    productData: [],
    hasProductError: null
};

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            // FETCH ALL
            .addCase(fetchAllProduct.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isProductLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchAllProduct.rejected, (state, action) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // FETCH BY ID
            .addCase(fetchProductById.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.productData = [action.payload];
            })
            .addCase(fetchProductById.rejected, (state: ProductState, action: any) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // SIZE
            .addCase(fetchProductBySize.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchProductBySize.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProductBySize.rejected, (state: ProductState, action: any) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // BRAND
            .addCase(fetchProductByBrand.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchProductByBrand.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProductByBrand.rejected, (state: ProductState, action: any) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // COLOR
            .addCase(fetchProductByColor.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchProductByColor.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProductByColor.rejected, (state: ProductState, action: any) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // PRICE
            .addCase(fetchProductByPrice.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchProductByPrice.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProductByPrice.rejected, (state: ProductState, action: any) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // SEARCH
            .addCase(fetchProductBySearch.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(fetchProductBySearch.fulfilled, (state, action) => {
                state.isProductLoading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProductBySearch.rejected, (state: ProductState, action: any) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // ADD
            .addCase(addProduct.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.isProductLoading = false;
                state.productData.unshift(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // UPDATE
            .addCase(updateProduct.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.isProductLoading = false;
                const index = state.productData.findIndex(
                    (p) => p._id === action.payload._id
                );
                if (index !== -1) {
                    state.productData[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })

            // DELETE
            .addCase(deleteProductData.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(deleteProductData.fulfilled, (state, action: PayloadAction<string>) => {
                state.isProductLoading = false;
                state.productData = state.productData.filter(
                    (p) => p._id !== action.payload
                );
            })
            .addCase(deleteProductData.rejected, (state, action) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            })
            
            // DELETE CART
            .addCase(deleteTrashProductData.pending, (state) => {
                state.isProductLoading = true;
            })
            .addCase(deleteTrashProductData.fulfilled, (state, action: PayloadAction<null>) => {
                state.isProductLoading = false;
                state.productData = state.productData.filter(
                    (p) => p._id !== action.payload
                );
            })
            .addCase(deleteTrashProductData.rejected, (state, action) => {
                state.isProductLoading = false;
                state.hasProductError = action.error.message ?? null;
            });
    },
});

export default productSlice.reducer;