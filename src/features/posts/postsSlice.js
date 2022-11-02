import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsApdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.locleCompare(a.date)
})
const initialState = postsApdapter.getInitialState({
    // posts: [],
    status: 'idle', // 'idle' || 'loading' || 'succeeded' || 'failed'
    error: null,
    count: 0
})
// create middles thunk: 
// 1. paramater is prefix ==> generate action
//2. payload creater callback
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return response.data
    } catch (error) {
        return error
    }
})

// 2. new thunk middleware when create new post: 
export const addNewPost = createAsyncThunk('post/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data
    } catch (error) {
        return error
    }
})
// 3. delete post : 
export const deletePost = createAsyncThunk('delete/post', async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        console.log(response)
        if (response?.status === 200) return initialPost
        return `${response?.status}:${response?.statusText}`
    } catch (error) {
        return error
    }
})
// 4.update post 
export const updatePost = createAsyncThunk('post/updatePost', async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (error) {
        // return error.message
        return initialPost
    }
})
const postSlice = createSlice({
    name: 'posts',
    initialState,//initialState is known as initialState above ==> now it become this reducer's value
    reducers: {
        // 1. reducer
        increaseCount(state, action) {
            state.count = state.count + 1
        },
        // 2. reducer
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            // const existingPost = state.posts.find(post => post.id === postId)
            // pass
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // 1. the promise could be pending ==> we do action ==> by status ==> loading
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            // 2. the promise could be fullfill ==> that success 
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // adding date vs reaction
                let min = 1;
                // create a loadedpost ==> which have all the data 
                const loadedPost = action.payload.map(post => {
                    // add porperty for this post
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                })
                // merge it the posts
                // state.posts = state.posts.concat(loadedPost)
                postsApdapter.updateMany(state,loadedPost)
            })
            // 3. in case we fail to fetch data.
            .addCase(fetchPosts.rejected, (state, action) => {
                // set status is failed
                state.status = 'failed'
                // this action error is created on catch
                state.error = action.error.message

            })
            // 4.case when add new post ==> we create a data send back from server
            .addCase(addNewPost.fulfilled, (state, action) => {
                // let { userId, date, reactions } = {...action.payload}
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                // state.posts.push(action.payload)
                postsApdapter.addOne(state,action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return
                }
                const { id } = action.payload
                const posts = state.posts.filter(post => post.id === id)
                state.posts = posts
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('update could not complete ')
                    console.log(action.payload)
                    return
                }
                const { id } = action.payload
                action.payload.date = new Date().toISOString()
                // every post have there special id ==> so we filter all the post except the  new one
                const posts = state.posts.filter(post => post.id !== id)
                // after then we add it to new arr and assign new arr to state.post
                state.posts = [...posts, action.payload]
            })
    }
})


export const selectAllPost = (state) => state.postsSliceReducer.posts;
export const getPoststatus = (state) => state.postsSliceReducer.status;
export const getPostsErr = (state) => state.postsSliceReducer.error;
export const getCount = (state) => state.postsSliceReducer.count;

export const selectPostById = (state, postId) => state.postsSliceReducer.posts.find(post => post.id === postId)

export const selectPostByUser = createSelector(
    // 1. parameter it can be selector/callback fn...
    [selectAllPost, (state, userId) => userId],
    // 2. now we have new selector
    (post, userId) => post.filter(post => post.userId === userId)
)

// epxort action
export const { increaseCount, reactionAdded, } = postSlice.actions
// export reducer
export default postSlice.reducer