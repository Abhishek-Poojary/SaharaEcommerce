import { Fragment } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./OrderList.css"
import { Link, useNavigate } from "react-router-dom";

const OrderList = (props) => {
    const { order, index } = props
    const navigate = useNavigate();

    const customButton = (id) => {
        navigate(`/profile/order/${id}`)
    }
    return (
        <Fragment>


            <tr>
                <td className="customTitleOrderList-1">{index + 1}</td>
                <td>

                    {order.orderItems.map((data) => (
                        <Row key={data._id} className="customHR">

                            <Col className="customTitleOrderList-1" md={4}>{data.name}</Col>
                            <Col className="customTitleOrderList-1" md={3}>${data.price}</Col>
                            <Col className="customTitleOrderList-1" md={4}>{data.quantity} Products</Col>

                        </Row>
                        
                    ))}

                </td>



                <td className="customTitleOrderList-1"> {order.totalPrice}</td>
                <td className="customTitleOrderList-1"> <Button onClick={() => customButton(order._id)}>View Order Details</Button></td>
                <td className="customTitleOrderList-1"> {order.orderStatus}</td>
            </tr>

        </Fragment>
    )
}

export default OrderList