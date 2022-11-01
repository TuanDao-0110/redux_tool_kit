import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "../features/posts/postsSlice";
import userSlice from "../features/users/userSlice";
export const store = configureStore({
    reducer: {
        postsSliceReducer,
        users: userSlice
    }
})