
import { Routes, Route, Navigate } from 'react-router-dom';
import Public from './components/Public'
import Layout from './components/Layout';
import Login from './features/auth/Login'
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome'
import UserList from './features/users/UserList'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout></Layout>}>
        <Route index element={<Public></Public>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        {/* protect route */}
        <Route element={<RequireAuth></RequireAuth>}>
          <Route path='welcome' element={<Welcome></Welcome>}></Route>
          <Route path='userlist' element={<UserList></UserList>}></Route>
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
