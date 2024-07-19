import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    likedVideos: [],
};

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async (videoId) => {
    try {
        const response = await axiosInstance.post(`/like/toggle/v/${videoId}`)

        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async (commentId) => {
    try {
        const response = await axiosInstance.post(`/like/toggle/c/${commentId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const getAllLikedVidoes = createAsyncThunk("getAllLikedVidoes", async () => {
    try {
        const response = await axiosInstance.get(`/like/likedVideos`)
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleVideoLike.pending, (state) => {
            state.loading = true
        })
        builder.addCase(toggleVideoLike.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(toggleCommentLike.pending, (state) => {
            state.loading = true
        })
        builder.addCase(toggleCommentLike.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getAllLikedVidoes.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllLikedVidoes.fulfilled, (state, action) => {
            state.loading = false,
            state.likedVideos = [...action.payload]
        })
    }
})


export default likeSlice.reducer