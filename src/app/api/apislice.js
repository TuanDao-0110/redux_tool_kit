import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    // set up token 
    prepareHeaders: (headers, { getState, }) => {
        // get token from store
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})


// in case token expire ==> base query can help to refesh vs take new token . 

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // check basequery  ==> make sure token valid.
    let result = await baseQuery(args, api, extraOptions)
    // in case we use expire token backend will send back status 403:
    // otherwise it will send 401. 
    if (result?.error?.originalStatus === 403) {
        console.log('sending refesh token')
        // send refreh token to get new access token 
        // so ==> start to call new token by https request by backend
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log('refreshResult')
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store new token to redux by using dipatch
            api.dipatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query to with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            // incase we dont have any data from api ==> that mean about token not renew ==> so we logout 
            api.dispatch(logOut())
        }
    }

    return result
}

// now we 
export const apiSlice = createApi({
    baseQuery:baseQuery,
    endpoints:build =>({
      
    })
})