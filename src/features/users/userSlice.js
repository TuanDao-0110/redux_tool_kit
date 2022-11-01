import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', name: 'JOE' },
    { id: '2', name: 'HANA' },
    { id: '3', name: 'TIK' },

]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    }
})



export const selectALlUser = state => state.users
export default userSlice.reducer