import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './couterSlice'

export default function Counter() {
    const count = useSelector(state => state.counterReducer.count)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(0)
    const addValue = Number(incrementAmount) || 0
    const resetAll = ()=>{
        setIncrementAmount(0)
        dispatch(reset())
    }
    return (
        <>
            <section>
                <p>{count}</p>
                <div>
                    <button onClick={() => {
                        dispatch(increment())
                    }}>+</button>
                    
                    <button onClick={() => {
                        dispatch(decrement())
                    }}>-</button>

                </div>
                <div>
                    <input type='text' value={incrementAmount} onChange={(e) => {
                        setIncrementAmount(e.target.value)
                    }}></input>
                    <button onClick={()=> { 
                        dispatch(incrementByAmount(addValue))
                    }}>
                        add Amount
                    </button>
                    <button onClick={() => {
                        resetAll()
                    }}>reset</button>
                </div>
            </section>
        </>
    )
}
