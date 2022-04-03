import { Fragment } from "react"
import { Card, Row, Col } from 'react-bootstrap';
import "./OrderList.css"
import { Link } from "react-router-dom";

const OrderList = (props) => {
    const { order } = props

    return (
        <Fragment>
            <Row>
                <Col>
                    <h2>Order Items</h2>
                    {order.orderItems.map((data) => (
                        <div key={data._id}>
                            <h4>{data.name}</h4>
                            <h4>{data.price}</h4>
                            <h4>{data.quantity}</h4>

                        </div>

                    ))}
                </Col>
                <Col>
                    {order.totalPrice}
                </Col>
                <Col>
                    <Link to={`/profile/order/${order._id}`}>View Order Details</Link>
                </Col>
                <Col>
                    <h1>{order.orderStatus}</h1>

                </Col>
            </Row>




        </Fragment>
    )
}

export default OrderList