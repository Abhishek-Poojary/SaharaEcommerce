
import Header from "./component/common/Header/Header"
import  {BrowserRouter as Router} from"react-router-dom";
import React from"react";
import Footer from './component/common/Footer/Footer';

function App() {
  return (
    <Router>
      <Header/>
      <Footer/>
    </Router>
    
  );
}

export default App;
