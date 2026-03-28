import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slice/auth/authSlice";
import productSliceReducer from "../slice/productSlice";
import userSliceReducer from "../slice/userSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        product: productSliceReducer,
        user: userSliceReducer
    }
})

export default store;