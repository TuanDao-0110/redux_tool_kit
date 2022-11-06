import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
export default function Login() {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState("")
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(userRef.current.value)
    try {
      // get access token
      const userData = await login({ user, pwd }).unwrap()
      // store to redux with user also
      dispatch(setCredentials({ ...userData, user }))
      setUser('')
      setPwd('')
      navigate('/welcome')
    } catch (error) {
      if (!error?.originalStatus) {
        setErrMsg('NO Server Response')
      } else if (error.originalStatus === 400) {
        setErrMsg('Missing Username or Password')
      } else if (error.originalStatus === 401) {
        setErrMsg('Unathorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = e => setUser(e.target.value)
  const handlePwdInput = e => setPwd(e.target.value)
  return (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive">
        {errMsg}
      </p>

      <h1>Employee Login</h1>

      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  )
}
