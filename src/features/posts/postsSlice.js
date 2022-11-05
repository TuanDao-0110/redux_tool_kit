import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()




export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            // 1 . we do some job with our data we receive
            transformResponse: responseData => {
                let min = 1;
                // 1.1 we set ourdata ==>    
                const loadedPosts = responseData.map(post => {
                    // 1.1.1 add time if it dont have time
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // 1.1.1 add object action if dont have reaction
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                // 1.2 type here is about 
                { type: 'Post', id: "LIST" },
                // so the result will give list of id when createEnityAdapter offer us 
                // we map it and return the same 
                // ids here is from createEntityApdater when it return entities's [value] vs ids[]
                // first value of array is our form ==> second value is to announce each data with different id. 
                ...result.ids.map(id => ({ type: 'Post', id }))

            ]
        }),
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),

            // queryFulfilled is promsie
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
                    extendedApiSlice.util.updateQueryData('getPosts', 'getPosts', draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    // check if it undo ==> we use again old data.
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
    })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice

console.log(initialState)
// return the query result object 
export const selectPostResult = extendedApiSlice.endpoints.getPosts.select()

// create memized selector 
const selectPostsData = createSelector(
    selectPostResult,
    postsResult => postsResult.data  // normalized state object with ids && entities
)
// getSelectors creates these selectors and we rename with alises using destructuring
export const {
    selectAll: selectAllPost,
    selectById: selectPostById,
    selectIds: selectPostIds,
    // pass in a selector that return the post slice of state 
} = postsAdapter.getSelectors(
    state=>
    // if state dont show any thing 
    (selectPostsData(state))
    // we can get data straight from initialState => 
    && initialState
)