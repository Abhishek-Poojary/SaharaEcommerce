import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react";
import './Product.css'
import { getProductDetails } from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { userAddToCart } from "../../../actions/cartAction";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error, loading } = useSelector((state) => state.product)



  const [count, setCount] = useState(0);
  const [imageUrl, SetImageUrl] = useState();


  const [buttonValue, setButtonValue] = useState("Add To Cart");
  const [customValue, setCustomValue] = useState("");


  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id ])

  const addCount = () => {
    if (product.inStock <= count) return;

    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (0 >= count) return;

    setCount(count - 1);
  };

  const addToCart = () => {
  
   
      if (count > 0) {
        setButtonValue("Product added");
        dispatch(userAddToCart(id, count))
        setCustomValue("bg-success text-white")
      }else{
        setButtonValue("Please Add Count");  
        setCustomValue("bg-black text-white")
      }
   
    

    setTimeout(()=>{
      setButtonValue("Add To Cart");
      setCustomValue("")
    },2000)



  }
  const changeImage = (url) => {
    SetImageUrl(url);
  }

  return (<Fragment>
    {loading === false && (
      <Row className="customContainer-4-1">
        <Col md={2}>
          {product && product.images.map((image, index) => (
            <Image key={index} src={image.url} alt="Product Preview" onClick={(e) => SetImageUrl(image.url)} className="customImageProduct" />
          ))}
        </Col>
        <Col md={6} >
          <Image src={imageUrl ? imageUrl : product.images[0].url} className="customImage" rounded height={"300vmax"} />
        </Col>
        <Col className="customDisplay">
          <p className="customTitle-1">{product.name}</p>
          <p className="customTitle-1-1">{product.description}</p>
          <p className="customTitle-1-2">$ {product.price}</p>
          <p className="customTitle-1-3">{product.inStock} Stocks left</p>
          
          <div >
            <div className="customInput">
              <button className="customButton-1-1" onClick={addCount}>+</button>
              <input readOnly type="number" value={count} />
              <button className="customButton-1-2" onClick={decreaseCount} >-</button>
            </div>
            <button className={product.inStock>0 ? `customButton-1-3 ${customValue}`:"customButton-1-3 bg-info text-white"}
              disabled={product.inStock < 1 ? true : false}
              onClick={addToCart}
            >
              {product.inStock>0 ? buttonValue : "No Stock Available"}
            </button>
          </div>
        </Col>
      </Row>
    )}

  </Fragment>

  )
}


export default Product;