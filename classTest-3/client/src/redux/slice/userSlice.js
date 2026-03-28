import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance/axiosInstance";
import { endPoint_Profile } from "../../api/apiUrl/apiUrl";

export const profileSlice = createAsyncThunk("userSlice/profileSlice",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(endPoint_Profile);
            // console.log('Response for fetching profile', res);

            return res?.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)


const initialState = {
    isProfileLoading: false,
    profileData: null,
    hasProfileError: null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.isProfileLoading = false;
            state.profileData = null;
            state.hasProfileError = null;
        }
    },
    extraReducers: builder => {

        builder.addCase(profileSlice.pending, (state, action) => {
            state.isProfileLoading = true;
        })
        builder.addCase(profileSlice.fulfilled, (state, action) => {
            state.isProfileLoading = false;
            state.profileData = action.payload;
        })
        builder.addCase(profileSlice.rejected, (state, action) => {
            state.isProfileLoading = false;
            state.hasProfileError = action.error.message;
        })
    }
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;