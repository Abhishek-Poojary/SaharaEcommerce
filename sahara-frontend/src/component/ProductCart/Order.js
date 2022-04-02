import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

const Order = () => {
    const navigate= useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
  
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


    const orderConfirmed=()=>{
        const order={
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(order));

        navigate("/order/paymentInfo")
    }

    return (
        <Fragment>
            {user && (  //after clinking on product and coming bak this page gts error so added usercheck
                <Container>
                    <Col>
                        <Row>
                            <h3>User name:</h3>{user.name}
                        </Row>
                        <Row>
                            <h3>Phone no:</h3>{shippingInfo.phoneNo}
                        </Row>
                        <Row>
                            <h3>address:</h3>{address}
                        </Row>

                        <Row>
                            <h3>your cart Items</h3>
                            {cartItems && cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src="https://res.cloudinary.com/dbunwmh8z/image/upload/v1648531024/samples/ecommerce/accessories-bag.jpg" width={"80vmax"} />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    <span>

                                    </span>


                                </div>
                            ))}
                        </Row>
                        <Row>

                            <div>
                                <div >
                                    <h3>Your Order Summary</h3>
                                    <div>
                                        <div>
                                            <p>Subtotal:</p>
                                            <span>₹{subtotal}</span>
                                        </div>
                                        <div>
                                            <p>Shipping Charges:</p>
                                            <span>₹{shippingCharges}</span>
                                        </div>
                                        <div>
                                            <p>GST:</p>
                                            <span>₹{tax}</span>
                                        </div>
                                    </div>

                                    <div className="orderSummaryTotal">
                                        <p>
                                            <b>Total:</b>
                                        </p>
                                        <span>₹{totalPrice}</span>
                                    </div>

                                    <button onClick={orderConfirmed}>Proceed To Payment</button>
                                </div>
                            </div>
                        </Row>
                    </Col>

                </Container>
            )}

        </Fragment>
    )

}

export default Order;