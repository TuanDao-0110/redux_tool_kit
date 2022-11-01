import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // 'idle' || 'loading' || 'succeeded' || 'failed'
    error: null
}
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

const postSlice = createSlice({
    name: 'posts',
    initialState,//initialState is known as initialState above ==> now it become this reducer's value
    reducers: {
        // 1. reducer
        postAddded: {
            // reducer on this case just doing actions 
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            // prepare in this will present for action.payload: ==> it help to modify payload structure 
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        // 2. reducer
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
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
                console.log(loadedPost)
                // merge it the posts
                state.posts = state.posts.concat(loadedPost)
            })
            // 3. in case we fail to fetch data.
            .addCase(fetchPosts.rejected,(state,action)=> { 
                // set status is failed
                state.status = 'failed';
                // this action error is created on catch
                state.error = action.error.message
            
            })
    }
})


export const selectAllPost = (state) => state.postsSliceReducer.posts;
export const getPoststatus = (state) => state.postsSliceReducer.status;
export const getPostsErr = (state) => state.postsSliceReducer.error;
// epxort action
export const { postAddded, reactionAdded } = postSlice.actions
// export reducer
export default postSlice.reducer