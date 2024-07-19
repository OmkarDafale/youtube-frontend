import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    comments: [],
    totalComments: 0,
    hasNextPage: false
}


export const getVideoComments = createAsyncThunk('getVideoComments', async (videoId) => {
    try {
        const response = await axiosInstance.get(`/comment/${videoId}`)
        return response?.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const addComment = createAsyncThunk('addComment', async ({ videoId, content }) => {
    console.log('slice', videoId, content)
    try {
        const response = await axiosInstance.post(`/comment/${videoId}`, { content })
        console.log(response)
        return response?.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})


const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getVideoComments.fulfilled, (state, action) => {
            state.loading = false
            state.comments = [...action.payload.docs]
            state.totalComments = action.payload.totalDocs
            state.hasNextPage = action.payload.hasNextPage
        })
        builder.addCase(addComment.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addComment.fulfilled, (state) => {
            state.loading = false
        })
    }

})

export default commentSlice.reducer