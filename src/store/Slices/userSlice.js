import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    loading: false,
    watchHistory: []
}

export const userWatchHistory = createAsyncThunk('userWatchHistory', async () => {
    try {
        const response = await axiosInstance.get('/users/watch-history')
        return response?.data?.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userWatchHistory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userWatchHistory.fulfilled, (state, action) => {
            state.loading = false,
                state.watchHistory = [...action.payload]
        })
    }
})

export default userSlice.reducer

