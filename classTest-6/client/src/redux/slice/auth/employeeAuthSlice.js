import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance/axiosInstance";
import { endPointAddEmployee, endPointEmployeeLogin } from "../../../api/apiUrl/apiUrl";

export const registerEmployeeSlice = createAsyncThunk("employeeAuthSlice/registerEmployeeSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for register', data);

            const res = await axiosInstance.post(endPointAddEmployee, data);
            // console.log('Response for register', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const loginEmployeeSlice = createAsyncThunk("employeeAuthSlice/loginEmployeeSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for login', data);

            const res = await axiosInstance.post(endPointEmployeeLogin, data);
            // console.log('Response for login', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const initialState = {
    isEmployeeAuthLoading: false,
    employeeAuthData: null,
    hasEmployeeError: null
}

export const employeeAuthSlice = createSlice({
    name: 'employeeAuthSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder.addCase(registerEmployeeSlice.pending, (state, action) => {
            state.isEmployeeAuthLoading = true;
        })
        builder.addCase(registerEmployeeSlice.fulfilled, (state, action) => {
            state.isEmployeeAuthLoading = false;
            state.employeeAuthData = action.payload;
        })
        builder.addCase(registerEmployeeSlice.rejected, (state, action) => {
            state.isEmployeeAuthLoading = false;
            state.hasEmployeeError = action.error.message;
        })

        builder.addCase(loginEmployeeSlice.pending, (state, action) => {
            state.isEmployeeAuthLoading = true;
        })
        builder.addCase(loginEmployeeSlice.fulfilled, (state, action) => {
            state.isEmployeeAuthLoading = false;
            state.employeeAuthData = action.payload;
        })
        builder.addCase(loginEmployeeSlice.rejected, (state, action) => {
            state.isEmployeeAuthLoading = false;
            state.hasEmployeeError = action.error.message;
        })
    }
});

export default employeeAuthSlice.reducer;