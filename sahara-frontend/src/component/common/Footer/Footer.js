import { Fragment } from "react";
import { Link } from "react-router-dom";
import './Footer.css'
const Footer = () => {


    return (<Fragment>
        <footer className="pt-4 border-top">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5>Sahara</h5>
                        <p>One Place Destination for all Online Shopping</p>
                    </div>

                  

                    <div className="col-md-6 mb-md-0 mb-3">
                        <h5>Links</h5>
                        <ul  className="list-unstyled">
                            <li><Link to="/home"  className="link-unstyled">Home</Link></li>
                            <li><Link to="/products"  className="link-unstyled">Products</Link></li>
                        </ul>
                    </div>

 
                </div>
            </div>

            <div className="text-center py-3"><p className="customBrand">Sahara</p>©2022 Copyright</div>

        </footer>
    </Fragment>);
}


export default Footer;