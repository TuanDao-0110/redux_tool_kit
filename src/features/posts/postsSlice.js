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
        return error.message
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
                state.posts = state.posts.concat(loadedPost)
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
                state.posts.push(action.payload)
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

export const selectPostById = (state, postId) => state.postsSliceReducer.posts.find(post => post.id === postId)

// epxort action
export const { postAddded, reactionAdded, } = postSlice.actions
// export reducer
export default postSlice.reducer