import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = [
    { id: 1, title: 'Learning Redux Toolkit', content: 'learning content' },
    { id: 2, title: 'Slices...', content: 'the more thing i say .....' }

]



const postSlice = createSlice({
    name: 'posts',
    initialState,//initialState is known as initialState above ==> now it become this reducer's value
    reducers: {
        postAddded: {
            // reducer on this case just doing actions 
            reducer(state, action) {
                state.push(action.payload)
            },
            // prepare in this will present for action.payload: ==> it help to modify payload structure 
            prepare(title, content,userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }
                }
            }
        }
    }
})


export const selectAllPost = (state) => state.postsSliceReducer;
// epxort action
export const { postAddded } = postSlice.actions
// export reducer
export default postSlice.reducer