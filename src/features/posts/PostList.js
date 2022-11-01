import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import { selectAllPost } from './postsSlice'
import ReactionBtn from './ReactionBtn'
import TimeAgo from './TimeAgo'
export default function PostList() {
    // const posts = useSelector(state => state.postsSliceReducer)

    // we can write shorten like this:
    const posts = useSelector(selectAllPost)
    // sorting the post : 
    const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const renderedPost = () => {
        return orderedPost?.map((item, index) => {
            return <article key={`${item.id}--${index}`}>
                <h3>{item.title}</h3>
                <p>{item.content?.substring(0, 100)}</p>
                <p className='postCreadit'>
                    <PostAuthor userId={item?.userId}></PostAuthor>
                    <TimeAgo timestamp={item.date}></TimeAgo>

                </p>
                <ReactionBtn post={item}></ReactionBtn>
            </article >
        })
    }


    return (
        <section>
            <h2>Posts</h2>
            {renderedPost()}
        </section>
    )
}
