import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance/axiosInstance";
import { endPointAdminLogin, endPointAdminRegister } from "../../../api/apiUrl/apiUrl";


export const adminRegisterSlice = createAsyncThunk("authSlice/adminRegisterSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for register', data);

            const res = await axiosInstance.post(endPointAdminRegister, data);
            // console.log('Response for register', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const adminLoginSlice = createAsyncThunk("authSlice/adminLoginSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for login', data);

            const res = await axiosInstance.post(endPointAdminLogin, data);
            // console.log('Response for login', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const initialState = {
    isAdminAuthLoading: false,
    adminAuthData: null,
    hasAdminAuthError: null
}

export const adminAuthSlice = createSlice({
    name: 'adminAuthSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder.addCase(adminRegisterSlice.pending, (state, action) => {
            state.isAdminAuthLoading = true;
        })
        builder.addCase(adminRegisterSlice.fulfilled, (state, action) => {
            state.isAdminAuthLoading = false;
            state.adminAuthData = action.payload;
        })
        builder.addCase(adminRegisterSlice.rejected, (state, action) => {
            state.isAdminAuthLoading = false;
            state.hasAdminAuthError = action.error.message;
        })

        builder.addCase(adminLoginSlice.pending, (state, action) => {
            state.isAdminAuthLoading = true;
        })
        builder.addCase(adminLoginSlice.fulfilled, (state, action) => {
            state.isAdminAuthLoading = false;
            state.adminAuthData = action.payload;
        })
        builder.addCase(adminLoginSlice.rejected, (state, action) => {
            state.isAdminAuthLoading = false;
            state.hasAdminAuthError = action.error.message;
        })
    }
});

export default adminAuthSlice.reducer;