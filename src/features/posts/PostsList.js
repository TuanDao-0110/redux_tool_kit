import { useSelector } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from './postsSlice';
import { selectAllPost } from '../posts/postsSlice'
const PostsList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery('getPosts')
    const allDate = useSelector(selectAllPost)
    console.log(allDate)
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