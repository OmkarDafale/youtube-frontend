import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice.js';
import videoSlice from './Slices/videoSlice.js';
import likeSlice from './Slices/likeSlice.js';
import subscriptionSlice from './Slices/subscriptionSlice.js';
import commentSlice from './Slices/commentSlice.js';
import userSlice from './Slices/userSlice.js';




const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoSlice,
    like: likeSlice,
    subscription: subscriptionSlice,
    comment: commentSlice,
    user: userSlice
  }
})

export default store;
