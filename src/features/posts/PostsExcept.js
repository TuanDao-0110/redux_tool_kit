import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionBtn from './ReactionBtn'

export default function PostsExcept({post}) {
    
    return <article>
        <h3>{post.title}</h3>
        <p>{post.body?.substring(0, 100)}</p>
        <p className='postCreadit'>
            <PostAuthor userId={post?.userId}></PostAuthor>
            <TimeAgo timestamp={post.date}></TimeAgo>

        </p>
        <ReactionBtn post={post}></ReactionBtn>
    </article >
}
