import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from '../../actions/orderAction'
import "./UserOrders.css"
import OrderList from '../common/OrderList/OrderList'

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


                        {orders && orders.map((order) => (
                            <OrderList order={order} key={order._id} />
                        ))}
                    </div>

                )





            }




        </Fragment>
    )
}

export default UserOrders;