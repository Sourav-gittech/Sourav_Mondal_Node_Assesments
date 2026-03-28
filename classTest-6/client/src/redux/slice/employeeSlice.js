import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance/axiosInstance";
import { endPointEmployee, endPointEmployeeChangePassword, endPointEmployeeProfile, endPointResetPassword } from "../../api/apiUrl/apiUrl";

export const allEmployeeSlice = createAsyncThunk("employeeSlice/allEmployeeSlice",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(endPointEmployee);
            // console.log('Response for all employee', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const updateEmployeeSlice = createAsyncThunk("employeeSlice/updateEmployeeSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for profile update', data);

            const res = await axiosInstance.put(endPointEmployeeProfile, data);
            // console.log('Response for update profile', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const updateEmployeeStatusSlice = createAsyncThunk("employeeSlice/updateEmployeeStatusSlice",
    async (id, { rejectWithValue }) => {
        try {
            // console.log('Received id for updating status', id);

            const res = await axiosInstance.get(`${endPointEmployee}${id}/status`);
            // console.log('Response for updating status', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const resetEmployeePasswordByAdminSlice = createAsyncThunk("employeeSlice/resetEmployeePasswordByAdminSlice",
    async (id, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for change password', id);

            const res = await axiosInstance.get(`${endPointResetPassword}${id}`);
            // console.log('Response for reset password', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const resetEmployeePasswordBySelfSlice = createAsyncThunk("employeeSlice/resetEmployeePasswordBySelfSlice",
    async (data, { rejectWithValue }) => {
        try {
            // console.log('Received data in slice for reset password', data);

            const res = await axiosInstance.put(endPointEmployeeChangePassword, data);
            // console.log('Response for reseting password', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const getProfileSlice = createAsyncThunk("employeeSlice/getProfileSlice",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(endPointEmployeeProfile);
            // console.log('Response for fetching profile', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

const initialState = {
    isEmployeeLoading: false,
    employeeData: null,
    hasEmployeeError: null
}

export const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {

        builder.addCase(allEmployeeSlice.pending, (state, action) => {
            state.isEmployeeLoading = true;
        })
        builder.addCase(allEmployeeSlice.fulfilled, (state, action) => {
            state.isEmployeeLoading = false;
            state.employeeData = action.payload;
        })
        builder.addCase(allEmployeeSlice.rejected, (state, action) => {
            state.isEmployeeLoading = false;
            state.hasEmployeeError = action.error.message;
        })

        builder.addCase(updateEmployeeSlice.pending, (state, action) => {
            state.isEmployeeLoading = true;
        })
        builder.addCase(updateEmployeeSlice.fulfilled, (state, action) => {
            state.isEmployeeLoading = false;
            state.employeeData = action.payload;
        })
        builder.addCase(updateEmployeeSlice.rejected, (state, action) => {
            state.isEmployeeLoading = false;
            state.hasEmployeeError = action.error.message;
        })

        builder.addCase(updateEmployeeStatusSlice.pending, (state, action) => {
            state.isEmployeeLoading = true;
        })
        builder.addCase(updateEmployeeStatusSlice.fulfilled, (state, action) => {
            state.isEmployeeLoading = false;
            state.employeeData = action.payload;
        })
        builder.addCase(updateEmployeeStatusSlice.rejected, (state, action) => {
            state.isEmployeeLoading = false;
            state.hasEmployeeError = action.error.message;
        })

        builder.addCase(resetEmployeePasswordByAdminSlice.pending, (state, action) => {
            state.isEmployeeLoading = true;
        })
        builder.addCase(resetEmployeePasswordByAdminSlice.fulfilled, (state, action) => {
            state.isEmployeeLoading = false;
            state.employeeData = action.payload;
        })
        builder.addCase(resetEmployeePasswordByAdminSlice.rejected, (state, action) => {
            state.isEmployeeLoading = false;
            state.hasEmployeeError = action.error.message;
        })

        builder.addCase(resetEmployeePasswordBySelfSlice.pending, (state, action) => {
            state.isEmployeeLoading = true;
        })
        builder.addCase(resetEmployeePasswordBySelfSlice.fulfilled, (state, action) => {
            state.isEmployeeLoading = false;
            state.employeeData = action.payload;
        })
        builder.addCase(resetEmployeePasswordBySelfSlice.rejected, (state, action) => {
            state.isEmployeeLoading = false;
            state.hasEmployeeError = action.error.message;
        })

        builder.addCase(getProfileSlice.pending, (state, action) => {
            state.isEmployeeLoading = true;
        })
        builder.addCase(getProfileSlice.fulfilled, (state, action) => {
            state.isEmployeeLoading = false;
            state.employeeData = action.payload;
        })
        builder.addCase(getProfileSlice.rejected, (state, action) => {
            state.isEmployeeLoading = false;
            state.hasEmployeeError = action.error.message;
        })
    }
});

export default employeeSlice.reducer;