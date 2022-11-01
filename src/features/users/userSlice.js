import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { act } from "react-dom/test-utils";
// 1. set user url: 

const USER_URL = 'https://jsonplaceholder.typicode.com/users';


export const fetchUsers = createAsyncThunk('user/fecthUser', async () => {
    try {
        const response = await axios.get(USER_URL)
        return response.data
    } catch (error) {
        return error
    }
})

const initialState = []

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                // return action.payload
                // or we can write 
                return state = action.payload
            })
    }
})



export const selectALlUser = state => state.users
export default userSlice.reducer