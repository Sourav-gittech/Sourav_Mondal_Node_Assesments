import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance/axiosInstance";
import { endPoint_Login, endPoint_Register } from "../../../api/apiUrl/apiUrl";

export const registerSlice = createAsyncThunk("authSlice/registerSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for register', data);

            const res = await axiosInstance.post(endPoint_Register, data);
            // console.log('Response for register', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const loginSlice = createAsyncThunk("authSlice/loginSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for login', data);

            const res = await axiosInstance.post(endPoint_Login, data);
            // console.log('Response for login', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const initialState = {
    isAuthLoading: false,
    authData: null,
    hasAuthError: null
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder.addCase(registerSlice.pending, (state, action) => {
            state.isAuthLoading = true;
        })
        builder.addCase(registerSlice.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.authData = action.payload;
        })
        builder.addCase(registerSlice.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.hasAuthError = action.error.message;
        })

        builder.addCase(loginSlice.pending, (state, action) => {
            state.isAuthLoading = true;
        })
        builder.addCase(loginSlice.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.authData = action.payload;
        })
        builder.addCase(loginSlice.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.hasAuthError = action.error.message;
        })
    }
});

export default authSlice.reducer;