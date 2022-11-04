import { useSelector } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import { selectPostResult, useGetPostsQuery } from './postsSlice';
const PostsList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('getPosts')
    const result = useSelector(selectPostResult)
    console.log(result)
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = posts.ids.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList