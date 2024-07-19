import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance"
import toast from "react-hot-toast"


const initialState = {
    loading: false,
    subscribedChannel: []
}

export const toggleSubscriber = createAsyncThunk("toggleSubscriber", async (userId) => {
    try {
        const response = await axiosInstance.post(`subscription/c/${userId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})


export const getSubscribedChannel = createAsyncThunk('getSubscribedChannel', async () => {
    try {
        const response = await axiosInstance.get(`subscription/u/subscribedChannel`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})


const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscriber.pending, (state) => {
            state.loading = true
        })
        builder.addCase(toggleSubscriber.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getSubscribedChannel.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getSubscribedChannel.fulfilled, (state, action) => {
            state.loading = false,
                state.subscribedChannel = [...action.payload]
        })
    }
})


export default subscriptionSlice.reducer