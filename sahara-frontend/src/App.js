
import Header from "./component/common/Header/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from"react";
import Footer from './component/common/Footer/Footer';
import Home from './component/Home/Home'

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
