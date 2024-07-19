import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance"
import toast from "react-hot-toast"


const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false
    },
    video: null,
    publishToggle: false
}


export const getAllVideos = createAsyncThunk(
    "getAllVideos",
    async ({ userId, sortBy, sortType, query, page, limit }) => {
        try {
            // const url = new URL(`/video`);
            // console.log(url)

            // if (userId) url.searchParams.set("userId", userId);
            // if (query) url.searchParams.set("query", query);
            // if (page) url.searchParams.set("page", page);
            // if (limit) url.searchParams.set("limit", limit);
            // if (sortBy && sortType) {
            //     url.searchParams.set("sortBy", sortBy);
            //     url.searchParams.set("sortType", sortType);
            // }
           
            const response = await axiosInstance.get(`/video`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getVideoById = createAsyncThunk("getVideoById",async({videoId})=>{
    try {
        const response = await axiosInstance.get(`/video/v/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        updateUploadState: (state) => {
            state.uploading = false;
            state.uploaded = false;
        },
        makeVideosNull: (state) => {
            state.videos.docs = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false,
                state.videos.docs = [...action.payload.docs]
            state.hasNextPage = action.payload.hasNextPage
        })
        builder.addCase(getVideoById.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getVideoById.fulfilled,(state,action)=>{
            state.loading = false,
            state.video = action.payload
        })
    }
})

export const {updateUploadState,makeVideosNull} =  videoSlice.actions
export default videoSlice.reducer