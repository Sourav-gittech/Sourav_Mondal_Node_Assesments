import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../slice/productSlice";


export const makeStore = () =>
  configureStore({
    reducer: {
      product: productSliceReducer
    }
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];