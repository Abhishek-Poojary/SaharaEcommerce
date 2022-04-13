import { Fragment } from "react";
import { Button, Col, Table, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const Order = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const totalforProduct = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
    );

    const shippingCharges = 200;

    const tax = totalforProduct * 0.09;

    const totalPrice = totalforProduct + tax + shippingCharges;




    const orderConfirmed = () => {
        const order = {
            totalforProduct,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(order));

        navigate("/order/paymentInfo")
    }

    const ProductNavigate = (id) => {
        navigate(`/product/${id}`);
    }
    return (
        <Fragment>
            {user && (  //after clinking on product and coming bak this page gts error so added usercheck
                <div className="customCart-1">
                    <Container>
                        <Row>
                            <Col>
                                <p className="customTitleProfile-1-3">Confirm Your Order and Address</p>
                            </Col>


                        </Row>



                        <Row >
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product Name </th>
                                        <th> Product Price</th>
                                        <th>Product quantity</th>
                                        <th>Product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((data, index) => (

                                        <tr key={index} className="customHR">

                                            <th className="customTitleOrderList-1" md={4}>{data.name}</th>
                                            <th className="customTitleOrderList-1" md={3}>${data.price}</th>
                                            <th className="customTitleOrderList-1" md={4}>{data.quantity} Products</th>
                                            <th>
                                                <Button onClick={() => ProductNavigate(data.product)} >View Product</Button>
                                            </th>
                                        </tr>

                                    ))}
                                    <tr>

                                        <th>Total Price for Products</th>
                                        <th> ${totalforProduct}</th>
                                    </tr>
                                    <tr>

                                        <th>Total Tax for Products</th>
                                        <th> ${tax} </th>
                                    </tr>
                                    <tr>

                                        <th>Shipping Price</th>
                                        <th> ${shippingCharges} </th>
                                    </tr>

                                    <tr>

                                        <th>Total Payment</th>
                                        <th> ${totalPrice} </th>
                                    </tr>
                                </tbody>
                            </Table>


                        </Row>
                        <Row>
                            <p className="customTitleProfile-1-3">Shipping Address</p>
                            <Col xs={12} md={3}>
                                <p className="customTitleOrderList-1">Address</p>
                                <p className="customTitleOrderList-1">City</p>
                                <p className="customTitleOrderList-1">pinCode</p>
                                <p className="customTitleOrderList-1">Phone Number</p>
                                <p className="customTitleOrderList-1">State</p>
                                <p className="customTitleOrderList-1">Country</p>
                            </Col>
                            <Col xs={12} md={3}>
                                <p className="customTitleOrderList-1">{shippingInfo.address}</p>
                                <p className="customTitleOrderList-1">{shippingInfo.city}</p>
                                <p className="customTitleOrderList-1">{shippingInfo.pinCode}</p>
                                <p className="customTitleOrderList-1">{shippingInfo.phoneNo}</p>
                                <p className="customTitleOrderList-1">{shippingInfo.state}</p>
                                <p className="customTitleOrderList-1">{shippingInfo.country}</p>
                            </Col>
                        </Row>

                        <Button onClick={orderConfirmed}>Proceed To Payment</Button>
                    </Container>
                </div>
            )}

        </Fragment>
    )

}

export default Order;