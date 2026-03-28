import { configureStore } from "@reduxjs/toolkit";
import adminAuthSliceReducer from "../slice/auth/adminAuthSlice";
import employeeSliceReducer from "../slice/employeeSlice";
import employeeAuthSliceReducer from "../slice/auth/employeeAuthSlice";


const store = configureStore({
    reducer: {
        adminAuth: adminAuthSliceReducer,
        employeeAuth: employeeAuthSliceReducer,
        employee: employeeSliceReducer
    }
})

export default store;