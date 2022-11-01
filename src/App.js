import AddPost from "./features/posts/AddPost";
import PostList from "./features/posts/PostList";
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<PostList></PostList>}></Route>
        <Route path="post">
          <Route index element={<AddPost></AddPost>}></Route>
          <Route path=":postId" element={<SinglePostPage></SinglePostPage>}></Route>
          <Route path="edit/:postId" element={<EditPostForm></EditPostForm>}></Route>
        </Route>
        <Route path="user">
          <Route index element={<UserList></UserList>}></Route>
          <Route path=":userId" element={<UserPage></UserPage>}></Route>
        </Route>
        <Route path="*" element={<Navigate to={'/'} replace></Navigate>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
