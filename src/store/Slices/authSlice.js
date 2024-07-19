import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../helper/axiosInstance';
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    status: false,
    userData: null
}

export const createAccount = createAsyncThunk("register",async (data) => {
    try {
        const formData = new FormData();
        formData.append("avatar", data.avatar[0]);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("fullName", data.fullName);
        if (data.coverImage) {
            formData.append("coverImage", data.coverImage[0]);
        }

        const response = await axiosInstance.post('/users/register',formData)
        toast.success(response.data.message)
        console.log(response)
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

export const userLogin = createAsyncThunk('login',async(data)=>{
    try {
        const response = await axiosInstance.post('/users/login',data)
        return response.data.data.user
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
    const response = await axiosInstance.get("/users/current-user");
    return response.data.data;
});


export const userLogout = createAsyncThunk('userLogout',async()=>{
    try {
        const response = await axiosInstance.post('/users/logout')
        toast.success(response.data?.message)
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(createAccount.fulfilled,(state)=>{
            state.loading = false
        });
        builder.addCase(userLogin.pending,(state)=>{
            state.loading = true
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.loading = false,
            state.status = true,
            state.userData = action.payload
        });
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.userData = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.userData = null;
        });
        builder.addCase(userLogout.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(userLogout.fulfilled,(state)=>{
            state.loading = false,
            state.status = false,
            state.userData = null
        })
    }
})

// const authAction = authSlice.actions
export default authSlice.reducer