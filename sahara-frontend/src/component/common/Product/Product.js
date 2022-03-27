import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect } from "react";
import './Product.css'
import { getProductDetails } from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

const Product = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, error } = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch,id])
    return (<Fragment>
        <Row className="customContainer">
            <Col md={6} >
                <Image src=
                    "https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"  className="customImage" rounded />
            </Col>
            <Col className="customDisplay">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>Stocks left :{product.inStock}</p>
                <div >
                  <div className="customInput">
                    <button className="customButton-1-1">-</button>
                    <input readOnly type="number" />
                    <button className="customButton-1-2" >+</button>
                  </div>
                  <button className="customButton-1-3"
                    disabled={product.inStock < 1 ? true : false}  
                  >
                    Add to Cart
                  </button>
                </div>
            </Col>
        </Row>
    </Fragment>

    )
}


export default Product;