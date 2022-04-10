import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from '../../actions/orderAction'
import "./UserOrders.css"
import OrderList from '../common/OrderList/OrderList'
import { Table, Container } from 'react-bootstrap'

const UserOrders = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user)
    const { error, loading, orders } = useSelector((state) => state.userOrders)


    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch])

    return (
        <Fragment>
            {loading ? (
                <h2>hi</h2>
            ) :
                (
                    <div className="customOrderList">
                        <Container>
                            <p className="customTitleProfile-1-3">Order History</p>


                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th><p className="customTitleUserOrder-1">No.</p></th>
                                        <th><p className="customTitleUserOrder-1">Ordered Items</p></th>
                                        <th><p className="customTitleUserOrder-1">Total Price</p></th>
                                        <th><p className="customTitleUserOrder-1">Details</p></th>
                                        <th><p className="customTitleUserOrder-1">OrderStatus</p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.map((order, index) => (
                                        <OrderList order={order} key={order._id} index={index} />
                                    ))}
                                </tbody>
                            </Table>

                        </Container>
                    </div>

                )





            }




        </Fragment>
    )
}

export default UserOrders;