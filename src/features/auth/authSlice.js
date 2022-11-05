import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            return { ...state, user: user, token: accessToken }
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    }
})


// export action
export const { setCredentials, logOut } = authSlice.actions
// export reducer
export default authSlice.reducer
// export selector : 

export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token


