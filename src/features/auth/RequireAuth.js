import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
export default function RequireAuth() {


  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  console.log(token)
  return (
    token ? <Outlet></Outlet> : <Navigate to='/login' state={{ from: location }} replace></Navigate>
  )
}
