import  {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Create API vs it Method
export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:4000'}),
    endpoints: builder => ({
        getTodos:builder.query({
            query :()=> '/todos'
        }),
    })
})