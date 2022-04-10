import { Fragment, useEffect, useState } from "react"
import { Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrderDetails } from "../../../actions/orderAction";
import { Container, Row } from 'react-bootstrap'
import './OrderDetails.css'


const OrderDetails = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [statusCss,setStatusCss]=useState("text-danger");
    const { loading, error, order } = useSelector((state) => state.orderDetails)
    useEffect(() => {
        if(loading===false ){
            if(order.orderStatus==="Shipped"){
                setStatusCss("text-info")
            }else if(order.orderStatus==="Delivered"){
                setStatusCss("text-success")
            }
        }
        dispatch(getUserOrderDetails(id))
    }, [dispatch, id])

    


    return (
        <Fragment>
            {loading === false &&
                <div className="customContainOrderDetails-1">


                    <Container>
                        <Row>
                            <Col>
                            <p className="customTitleProfile-1-3">Order Details</p>
                            </Col>
                            <Col>
                            <p className="customTitleProfile-1-3">Order Status:  <span className={statusCss} >{order.orderStatus}</span> </p>
                            </Col>
                            
                        </Row>
                      


                        <Row >
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product Name </th>
                                        <th> Product Price</th>
                                        <th>Product quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((data) => (
                                        <tr key={data._id} className="customHR">

                                            <th className="customTitleOrderList-1" md={4}>{data.name}</th>
                                            <th className="customTitleOrderList-1" md={3}>${data.price}</th>
                                            <th className="customTitleOrderList-1" md={4}>{data.quantity} Products</th>

                                        </tr>

                                    ))}
                                    <tr>

                                        <th>Total Price for Products</th>
                                        <th> {`$${order.orderItems.reduce(
                                            (sum, item) => sum + item.quantity * item.price,
                                            0
                                        )}`}</th>
                                    </tr>
                                    <tr>

                                        <th>Total Tax for Products</th>
                                        <th> ${order.taxPrice} </th>
                                    </tr>
                                    <tr>

                                        <th>Shipping Price</th>
                                        <th> ${order.shippingPrice} </th>
                                    </tr>

                                    <tr>

                                        <th>Total Paid Amount </th>
                                        <th> ${order.totalPrice} </th>
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
                                <p className="customTitleOrderList-1">{order.shippingInfo.address}</p>
                                <p className="customTitleOrderList-1">{order.shippingInfo.city}</p>
                                <p className="customTitleOrderList-1">{order.shippingInfo.pinCode}</p>
                                <p className="customTitleOrderList-1">{order.shippingInfo.phoneNo}</p>
                                <p className="customTitleOrderList-1">{order.shippingInfo.state}</p>
                                <p className="customTitleOrderList-1">{order.shippingInfo.country}</p>
                            </Col>
                        </Row>


                    </Container>
                </div>
            }


        </Fragment >
    )
}


export default OrderDetails