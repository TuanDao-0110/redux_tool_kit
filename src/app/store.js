import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/couterSlice'
const store = configureStore({
    reducer: {
        counterReducer
    }
})


export default store