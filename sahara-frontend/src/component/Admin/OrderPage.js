import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrderAdmin } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import {Col,Row} from 'react-bootstrap'
const OrderPage = () => {
    const { loading, order } = useSelector((state) => state.adminAllOrders)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderAdmin())
    }, [dispatch])


    return (
        <Fragment>
            
            {loading === false && (
                order && order.map((singleorder) => (
                    <Row key={singleorder._id}>
                        <Col>
                            <h2>Order Items</h2>
                            {singleorder.orderItems.map((data) => (
                                <div key={data._id}>
                                    <h4>{data.name}</h4>
                                    <h4>{data.price}</h4>
                                    <h4>{data.quantity}</h4>

                                </div>

                            ))}
                        </Col>
                        <Col>
                            {singleorder.totalPrice}
                        </Col>
                        <Col>
                            <Link to={`/admin/order/${singleorder._id}`}>Update Order Status</Link>
                        </Col>
                        <Col>
                            <h1>{singleorder.orderStatus}</h1>

                        </Col>
                    </Row>
                ))
            )}
        </Fragment>
    )
}

export default OrderPage