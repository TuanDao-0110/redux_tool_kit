import React from 'react'
import { useSelector, } from 'react-redux'
import { selectPostIds, getPoststatus, getPostsErr, selectTotal } from './postsSlice'
import PostsExcept from './PostsExcept'
export default function PostList() {
    // const posts = useSelector(state => state.postsSliceReducer)

    // we can write shorten like this:
    // const posts = useSelector(selectAllPost)
    const orderedPostIds = useSelector(selectPostIds)
    const postsStatus = useSelector(getPoststatus)
    const error = useSelector(getPostsErr)
    // sorting the post : 
    let content;
    if (postsStatus === 'loading') {
        content = <p>...loading</p>
    } else if (postsStatus === 'succeeded') {
        // const orderedPost = posts?.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPostIds?.map((postId, index) => {
            return <PostsExcept key={index} postId={postId}></PostsExcept>
        })

    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>
    }
    return (
        <section>
            {content}
        </section>
    )
}
