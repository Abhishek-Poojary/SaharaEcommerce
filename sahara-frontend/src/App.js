
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
import Shipping from './component/ProductCart/Shipping'

import Order from "./component/ProductCart/Order";

import OrderPaymentInfo from "./component/ProductCart/OrderPaymentInfo";
import OrderCompleted from "./component/ProductCart/OrderCompleted";
import UserOrders from "./component/Order/UserOrders";
import OrderDetails from "./component/common/OrderDetails/OrderDetails"
import AdminDashboard from "./component/Admin/AdminDashboard";

import ProductPage from "./component/Admin/ProductPage";
import OrderPage from "./component/Admin/OrderPage";
import UsersPage from "./component/Admin/UsersPage";

import ProductUpdate from "./component/Admin/ProductUpdate";
import ProductCreate from "./component/Admin/ProductCreate";
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

        <Route exact  path="/profile/update" element={<Protected  > <UpdateProfile /></Protected>}/>

        <Route exact path="/profile/password/update" element={<Protected   > <UpdatePassword /></Protected>}/>

        <Route exact path="/cart" element={ <Cart/>}/>

        <Route exact path="/shipping" element={<Protected  > <Shipping/></Protected>}/>

        <Route exact path="/order/confirm" element={<Protected  > <Order/></Protected>}/>

        <Route exact path="/order/paymentInfo" element={<Protected  > <OrderPaymentInfo/></Protected>}/>

        <Route exact path="/order/success" element={<Protected  > <OrderCompleted/></Protected>}/>
        
        <Route exact path="/profile/orders" element={<Protected  > <UserOrders/></Protected>}/>

        <Route exact path="/profile/order/:id" element={<Protected  > <OrderDetails/></Protected>}/>

        <Route exact path="/admin/dashboard" element={<Protected adminRoute={true} > <AdminDashboard/></Protected>}/>

        <Route exact path="/admin/products/all" element={<Protected adminRoute={true} > <ProductPage/></Protected>}/>
        
        <Route exact path="/admin/orders/all" element={<Protected adminRoute={true} > <OrderPage/></Protected>}/>

        <Route exact path="/admin/users/all" element={<Protected adminRoute={true} > <UsersPage/></Protected>}/>

        <Route exact path="/admin/product/:id" element={<Protected adminRoute={true} > <ProductUpdate/></Protected>}/>

        <Route exact path="/admin/product/new" element={<Protected adminRoute={true} > <ProductCreate/></Protected>}/>

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
