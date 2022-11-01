import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionBtn from './ReactionBtn'
import { useParams, Link } from 'react-router-dom'

export default function SinglePostPage() {
    // retrive postId
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, Number(postId)))
    if (!post) {
        return (
            <section>
                <h2>Post not</h2>
            </section>
        )
    }
    return (<article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p className='postCredit'>
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <PostAuthor userId={post.userId}></PostAuthor>
            <TimeAgo timestamp={post.date}></TimeAgo>

        </p>
        <ReactionBtn post={post}></ReactionBtn>
    </article>)
}
