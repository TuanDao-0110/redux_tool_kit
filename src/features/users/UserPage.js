import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { selectAllPost, selectPostByUser } from '../posts/postsSlice'
import { selectUserById } from './userSlice'
export default function UserPage() {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))
    const postsForUser = useSelector(state => selectPostByUser(state,Number(userId)))
    const postTitle = postsForUser?.map(post => <li
        key={post.id}
    >
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>)
    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {postTitle}
            </ol>
        </section>
    )
}
