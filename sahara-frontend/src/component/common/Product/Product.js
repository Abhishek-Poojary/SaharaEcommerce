import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react";
import './Product.css'
import { getProductDetails } from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { userAddToCart } from "../../../actions/cartAction";

const Product = () => {
    const dispatch = useDispatch();
    const {id} =useParams();
    const { product, error } = useSelector((state) => state.product)
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch,id])

    const [count,setCount]=useState(0);

    const addCount = () => {
      if (product.inStock <= count) return;

      setCount(count+1);
    };
  
    const decreaseCount = () => {
      if (1 >= count) return;

      setCount(count-1);
    };
  
    const addToCart=()=>{
     dispatch(userAddToCart(id,count))
      console.log("product added");
    }
    return (<Fragment>
        <Row className="customContainer">
            <Col md={6} >
                <Image src=
                    "https://res.cloudinary.com/dbunwmh8z/image/upload/v1648531024/samples/ecommerce/accessories-bag.jpg"  className="customImage" rounded />
            </Col>
            <Col className="customDisplay">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>Stocks left :{product.inStock}</p>
                <div >
                  <div className="customInput">
                    <button className="customButton-1-1" onClick={addCount}>+</button>
                    <input readOnly type="number" value={count} />
                    <button className="customButton-1-2" onClick={decreaseCount} >-</button>
                  </div>
                  <button className="customButton-1-3"
                    disabled={product.inStock < 1 ? true : false}  
                    onClick={addToCart}
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