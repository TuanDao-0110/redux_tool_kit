import React from 'react'
import { useSelector } from 'react-redux'
import { selectALlUser } from './userSlice'
import { Link } from 'react-router-dom'

export default function UserList() {
    const user = useSelector(selectALlUser)
    const renderedUser = user?.map(user => <li
        key={user.id}

    >
        <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>)
    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUser}</ul>
        </section>
    )
}
