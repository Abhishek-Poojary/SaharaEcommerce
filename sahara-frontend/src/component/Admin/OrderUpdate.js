import { Fragment, useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row,Button } from 'react-bootstrap'
import { getUserOrderDetails, updateOrderAdmin } from "../../actions/orderAction";
import { REQUEST_PROCESS_ORDER_ADMIN_RESET } from "../../constants/OrderConstants";

const OrderUpdate = () => {
    const navigate =useNavigate();
    const { id } = useParams();
    const { loading, order } = useSelector((state) => state.orderDetails)
    const { loading:updateLoading, status:update } = useSelector((state) => state.processOrder)
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");

    useEffect(() => {

        if(update){
            navigate('/admin/dashboard')
            dispatch({type:REQUEST_PROCESS_ORDER_ADMIN_RESET})
        }
        dispatch(getUserOrderDetails(id))

    }, [dispatch, id,update])


    const updateOrder=(e)=>{
        e.preventDefault();
        const data={
            status,
        }
        dispatch(updateOrderAdmin(id,data))
    }

    return (
        <Fragment>

            {loading === false && (

                <Row>
                    <Col>
                        <h2>Order Items</h2>
                        {order && order.orderItems.map((data) => (
                            <div key={data._id}>
                                <h4>{data.name}</h4>
                                <h4>{data.price}</h4>
                                <h4>{data.quantity}</h4>
                                <Link to={`/product/${data.product}`}>
                                    {data.name}
                                </Link>
                            </div>
                        ))}
                    </Col>
                    <Col>
                        {order.totalPrice}
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <h1>{order.orderStatus}</h1>
                    </Col>
                    <Col>

                        <form onSubmit={updateOrder}>
                            <h1>Process Order</h1>

                            <div>
                               
                                <select onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {order.orderStatus === "Processing" && (
                                        <option value="Shipped">Shipped</option>
                                    )}

                                    {order.orderStatus === "Shipped" && (
                                        <option value="Delivered">Delivered</option>
                                    )}
                                </select>
                            </div>

                            <Button type="submit" > Process </Button>
                        </form>
                    </Col>
                </Row>

            )}
        </Fragment>
    )
}

export default OrderUpdate