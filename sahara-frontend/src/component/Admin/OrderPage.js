import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrderAdmin } from "../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Table, Col, Button } from 'react-bootstrap'
const OrderPage = () => {
    const { loading, order } = useSelector((state) => state.adminAllOrders)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllOrderAdmin())
    }, [dispatch])

    const updateOrder = (id) => {
        navigate(`/admin/order/${id}`);
    }

    return (
        <Fragment>

            {loading === false && (

                <div className="customOrderList">
                    <Container>
                        <p className="customTitleProfile-1-3">Order DashBoard</p>


                        <Table responsive>
                            <thead>
                                <tr>
                                    <th><p className="customTitleUserOrder-1">No.</p></th>
                                    <th><p className="customTitleUserOrder-1">Ordered Items</p></th>
                                    <th><p className="customTitleUserOrder-1">Total Price</p></th>
                                    <th><p className="customTitleUserOrder-1">Update Status</p></th>
                                    <th><p className="customTitleUserOrder-1">OrderStatus</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && order.map((singleorder, index) => (
                                    <tr key={singleorder._id}>
                                        <td ><p className="customTitleOrderList-1">{index + 1}</p></td>
                                        <td>

                                            {singleorder.orderItems.map((data) => (
                                                <Row key={data._id} className="customHR">
                                                    <Col className="customTitleOrderList-1">{data.name}</Col>
                                                    <Col className="customTitleOrderList-1">{data.price}</Col>
                                                    <Col className="customTitleOrderList-1">{data.quantity}</Col>

                                                </Row>

                                            ))}
                                        </td>
                                        <td>
                                           <p className="customTitleOrderList-1">${singleorder.totalPrice}</p> 
                                        </td>
                                        <td>
                                            <Button onClick={() => updateOrder(singleorder._id)}  disabled={singleorder.orderStatus === "Delivered" ? true:false} >Update</Button>

                                        </td>
                                        <td>
                                        <p className="customTitleOrderList-1">{singleorder.orderStatus}</p>

                                        </td>
                                    </tr>
                                ))
                                }

                            </tbody>
                        </Table>

                    </Container>

                </div>

























            )}
        </Fragment>
    )
}

export default OrderPage