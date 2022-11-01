import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './couterSlice'
export default function Counter() {
    const count = useSelector(state => state.counterReducer.count)
    const dispatch = useDispatch()

    return (
        <>
            <section>
                <p>{count}</p>
                <div>
                    <button onClick={() => {
                        dispatch(increment())
                    }}>+</button>
                    <button onClick={() => {
                        dispatch(reset())
                    }}>reset</button>
                    <button onClick={() => {
                        dispatch(decrement())
                    }}>-</button>

                </div>
            </section>
        </>
    )
}
