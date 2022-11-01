import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns'

const initialState = [
    {
        id: 1, title: 'Learning Redux Toolkit', content: 'learning content', date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: 2, title: 'Slices...', content: 'the more thing i say .....', date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }

]



const postSlice = createSlice({
    name: 'posts',
    initialState,//initialState is known as initialState above ==> now it become this reducer's value
    reducers: {
        // 1. reducer
        postAddded: {
            // reducer on this case just doing actions 
            reducer(state, action) {
                state.push(action.payload)
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
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})


export const selectAllPost = (state) => state.postsSliceReducer;
// epxort action
export const { postAddded ,reactionAdded} = postSlice.actions
// export reducer
export default postSlice.reducer