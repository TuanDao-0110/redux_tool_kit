import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 1. import api create 
import {apiSlice} from './features/api/apiSlice'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  );