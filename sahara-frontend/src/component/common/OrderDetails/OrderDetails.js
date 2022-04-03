import { Fragment, useEffect } from "react"
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserOrderDetails } from "../../../actions/orderAction";
const OrderDetails = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const { loading, error, order } = useSelector((state) => state.orderDetails)
    useEffect(() => {
        dispatch(getUserOrderDetails(id))
    }, [])

    return (
        <Fragment>
            {loading ? (
                <h1>hi</h1>
            ) : (
                <div className="customContainer">
                    <Col>
                    <h1>{order.shippingInfo.address}</h1>

                    </Col>
                    <Col>
                    <h1>{order.orderStatus}</h1>

                    </Col>

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
                  
                </div >
            )
            }


        </Fragment >
    )
}


export default OrderDetails