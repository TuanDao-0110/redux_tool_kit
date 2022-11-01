import React from 'react'
import { useSelector } from 'react-redux'
import { selectALlUser } from '../users/userSlice'


export default function PostAuthor({ userId }) {
    const users = useSelector(selectALlUser)
    const author = users.find(user => user.id === userId)
    return (
        <span>
            by {author ? author.name : 'Unknown'}
        </span>
    )
}
