import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}
export default function ReactionBtn({ post }) {
    const dispatch = useDispatch()
    const reactionBtn = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return <button
            key={name}
            type='button'
            className='reactionButton'
            onClick={() => {
                dispatch(reactionAdded({ postId: post.id, reaction: name }))
            }}
        >
            {emoji} {post.reactions[name]}
        </button>
    })

    return (
        <div>{reactionBtn}</div>
    )
}
