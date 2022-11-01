import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/userSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));
// store offer dispatch ==> so when we load data ==> we can now load all the user information
store.dispatch(fetchUsers())
root.render(

  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App></App>}></Route>
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
