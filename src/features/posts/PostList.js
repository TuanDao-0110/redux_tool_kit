import React from 'react'
import { useSelector } from 'react-redux'
import {selectAllPost} from './postsSlice'
export default function PostList() {
    // const posts = useSelector(state => state.postsSliceReducer)
    // we can write shorten like this:
    const posts = useSelector(selectAllPost)
    const renderedPost = () => {
        return posts?.map((item, index) => {
            return <article key={`${item.id}--${index}`}>
                <h3>{item.title}</h3>
                <p>{item.content?.substring(0, 100)}</p>
            </article>
        })
    }
    return (
        <section>
            <h2>Posts</h2>
            {renderedPost()}
        </section>
    )
}
