import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from './authSlice'
import { Link } from 'react-router-dom'
export default function Welcome() {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  const welcome = user ? `Welcome ${user} !` : 'Welcome!'
  const tokenAbbr = `${token.slice(0, 9)}....`
  return (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p><Link to='/userlist'>Go to the Users List</Link></p>
    </section>
  )
}
