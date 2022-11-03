import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Create API vs it Method
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
    // tagTypes is named a cache data
    tagTypes: ["Todos"],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => ({
                url: '/todos',
            }),
            transformResponse:res => res.sort((a,b)=> a.id <b.id),
            providesTags: ["Todos"]
            // so we set up it 
        }),
        addToDo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        updateToDo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Todos"]
        })
    })
})


// create custom hook  we can name something else 
export const {
    // 1. this take end is todo an created by apiSlice 
    // 1.1 we can also name it differently : 
    // useLazyGetTodosQuery : getToDo
    useGetTodosQuery,
    // add todo with body 
    useAddToDoMutation,
    // update todo new body
    useUpdateToDoMutation,
    // update id also
    useDeleteTodoMutation

} = apiSlice