import AddPost from "./features/posts/AddPost";
import PostList from "./features/posts/PostList";
import { Route, Routes } from 'react-router-dom'
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<PostList></PostList>}></Route>
        <Route path="post">
          <Route index element={<AddPost></AddPost>}></Route>
          <Route path=":postId" element={<SinglePostPage></SinglePostPage>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
