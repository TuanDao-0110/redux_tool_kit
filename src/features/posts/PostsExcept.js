import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionBtn from './ReactionBtn'
import {Link} from 'react-router-dom'
export default function PostsExcept({post}) {
    
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
