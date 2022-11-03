import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionBtn from './ReactionBtn'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
const PostsExcept = ({ postId }) => {
    const post = useSelector(state => selectPostById(state,postId))
    return <article>
        <h2>{post.title}</h2>
        <p className='excerpt'>{post.body?.substring(0, 75)}</p>
        <p className='postCreadit'>
            <Link to={`post/${post.id}`}>View Post--</Link>
            <PostAuthor userId={post?.userId}></PostAuthor>
            <TimeAgo timestamp={post.date}></TimeAgo>

        </p>
        <ReactionBtn post={post}></ReactionBtn>
    </article >
}
// Memo allow PostsExcept not reRender if (post's value not change)
// PostsExcept = React.memo(PostsExcept)
export default PostsExcept