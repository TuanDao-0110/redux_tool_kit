import React from 'react'
import { useGetUsersQuery } from './userApiSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../auth/authSlice'
export default function UserList() {
  const token = useSelector(selectCurrentToken)

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()
  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <section className='users'>
      <h1>Users List</h1>
      <ul>
        {users?.map((user, index) => {
          return <li key={index}>
            {user.username}
          </li>
        })}
      </ul>
      <Link to='/welcome'>Back to Welcome</Link>
    </section>
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  }
  return (

    <>
      {content}
    </>
  )
}
