import { Fragment } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './OrderCompleted.css'


const OrderCompleted = () => {

    const navigate = useNavigate();

    const goToOrders = () => {
        navigate("/profile/orders");
    }

    return (
        <Fragment>
            <Container className="customContainerOrder-1">
                <p className="customTitle-1-1-1">Your Order was Placed Successfully</p>
                <Col>
                    <Button className="customTitle-1-7-1 shadow-none" onClick={goToOrders}>View Orders</Button>
                </Col>

            </Container>
        </Fragment>
    )
}


export default OrderCompleted;