import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Blog from './components/Blog/Index';
import Detail from './components/Blog/Detail';
import Register from './components/Member/Register';
import Login from './components/Member/Login';
import Comment from './components/Blog/Comment';
import ListComment from './components/Blog/ListComment';
import Rate from './components/Blog/Rate';
import Home from './Home/Home';
import Update from './components/Account/Update';
import Account from './components/Account/Account';
import AddProduct from './Product/AddProduct';
import MyProduct from './Product/MyProduct';
import EditProduct from './Product/EditProduct';
import ProductDetail from './Home/ProductDetail';
import Cart from './components/Cart/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/home/productDetail/:id' element={<ProductDetail/>}/>
          <Route  index path='/blog' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<Detail/>}/>
          <Route path='/blog/comment' element={<Comment/>}/>
          <Route path='/blog/listcomment' element={<ListComment/>}/>
          <Route path='blog/rate'element={<Rate/>}/>
          <Route path='/account/update' element={<Update/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path='/account'element={<Account/>}/>
          <Route path='/account/myProduct' element={<MyProduct/>}/>
          <Route path='/account/addProduct' element={<AddProduct/>}/>
          <Route path='/account/editProduct/:id' element={<EditProduct/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
