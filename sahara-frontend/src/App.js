
import Header from "./component/common/Header/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from"react";
import Footer from './component/common/Footer/Footer';
import Home from './component/Home/Home'
import Product from './component/common/Product/Product'
import Products from "./component/Products/Products"
import Login from './component/Login/Login'
import Register from "./component/Register/Register";

function App() {
  return (
    <Router>
      <Header/>
        <Routes>

          <Route exact path="/" element={<Home/>}/>

          <Route exact path="/product/:id" element={<Product />}/>

          <Route exact path="/products" element={<Products />}/>

          <Route  path="/products/:keyword" element={<Products />}/>

          <Route  path="/login" element={<Login/>}/>

          <Route  path="/register" element={<Register/>}/>

          
        </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
