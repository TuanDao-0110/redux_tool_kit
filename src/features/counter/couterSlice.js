import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    count: 0
}



const counterSlice = createSlice({
    // create slice offer 3 porperty : 1. reducer name, 2. address its state, 3. action with name vs action
    // 1 . name for the reducer 
    name: 'counter',
    // 2. address state for this reducer.
    initialState,
    // 3. reducer's actions:
    reducers: {
        increment: (state) => {
            state.count++
        },
        decrement: (state) => {
            state.count -= 1
        },
        reset: (state) => {
            state.count = 0
        }
    }
})

// 4. now we can export it use: 

export const { increment, decrement ,reset} = counterSlice.actions

export default counterSlice.reducer