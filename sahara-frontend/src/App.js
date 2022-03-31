
import Header from "./component/common/Header/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Footer from './component/common/Footer/Footer';
import Home from './component/Home/Home'
import Product from './component/common/Product/Product'
import Products from "./component/Products/Products"
import Login from './component/Login/Login'
import Register from "./component/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import {loadUser}  from "./actions/userAction"
import Profile from './component/Profile/Profile'
import Protected from "./component/ProtectedRoute/Protected";
import UpdateProfile from "./component/Profile/UpdateProfile";
import UpdatePassword from "./component/Profile/UpdatePassword";
import Cart from "./component/ProductCart/Cart";
function App() {
  const dispatch = useDispatch();
  const {isAuthenticated,error,user} =useSelector((state)=>state.user)

  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])

  return (
    <Router>
      <Header />
      <Routes>

        <Route exact path="/" element={<Home />} />

        <Route exact path="/product/:id" element={<Product />} />

        <Route exact path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route exact  path="/profile" element={<Protected  > <Profile/></Protected>}/>

        <Route exact  path="/profile/update" element={<Protected  > <UpdateProfile/></Protected>}/>

        <Route exact path="/profile/password/update" element={<Protected  > <UpdatePassword/></Protected>}/>

        <Route exact path="/cart" element={<Protected  > <Cart/></Protected>}/>

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
