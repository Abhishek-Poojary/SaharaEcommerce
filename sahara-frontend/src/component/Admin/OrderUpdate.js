import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table,Container } from 'react-bootstrap'
import { getUserOrderDetails, updateOrderAdmin } from "../../actions/orderAction";
import { REQUEST_PROCESS_ORDER_ADMIN_RESET } from "../../constants/OrderConstants";


const OrderUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, order } = useSelector((state) => state.orderDetails)
    const { loading: updateLoading, status: update } = useSelector((state) => state.processOrder)
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");

    useEffect(() => {

        if (update) {
            navigate('/admin/dashboard')
            dispatch({ type: REQUEST_PROCESS_ORDER_ADMIN_RESET })
        }
        dispatch(getUserOrderDetails(id))

    }, [dispatch, id, update])


    const updateOrder = (e) => {
        e.preventDefault();
        const data = {
            status,
        }
        dispatch(updateOrderAdmin(id, data))
    }

    return (
        <Fragment>

            {loading === false && (
                <div className="customOrderList">
                    <Container>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th><p className="customTitleUserOrder-1">Ordered Items</p></th>
                                    <th><p className="customTitleUserOrder-1">Total Price</p></th>
                                    <th><p className="customTitleUserOrder-1">Update Status</p></th>
                                    <th><p className="customTitleUserOrder-1">OrderStatus</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>

                                        {order && order.orderItems.map((data) => (
                                            <div key={data._id}>
                                                <p className="customTitleOrderList-1">{data.name}</p>
                                                <p className="customTitleOrderList-1">{data.price}</p>
                                                <p className="customTitleOrderList-1">{data.quantity}</p>
                                                {/* <Link to={`/product/${data.product}`}>
                                                    <Button  variant="primary mt-3">View Product</Button>
                                                </Link> */}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <p className="customTitleOrderList-1">$ {order.totalPrice}</p>
                                    </td>
                                    <td>
                                        <p className="customTitleOrderList-1">{order.orderStatus}</p>

                                    </td>
                                    <td>
                                        <form onSubmit={updateOrder}>
                                            <div className="customOrderUpdate-1">

                                                <select onChange={(e) => setStatus(e.target.value)} >
                                                    <option value="">Choose Category</option>
                                                    {order.orderStatus === "Processing" && (
                                                        <option value="Shipped">Shipped</option>
                                                    )}

                                                    {order.orderStatus === "Shipped" && (
                                                        <option value="Delivered">Delivered</option>
                                                    )}
                                                </select>
                                            </div>

                                            <Button type="submit" variant="primary mt-3"> Process </Button>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>

                </div>
            )}


        </Fragment>
    )
}

export default OrderUpdate