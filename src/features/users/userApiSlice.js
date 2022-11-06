import { apiSlice } from "../../app/api/apislice";
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            // 5 second
            keepUnusedDataFor: 5,
        })
    })
})


export const { useGetUsersQuery } = usersApiSlice