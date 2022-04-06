import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrderAdmin } from "../../actions/orderAction";
import { getAllProductAdmin } from "../../actions/productAction"
import { getAllUsersAdmin } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap'

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products)
    const { order } = useSelector((state) => state.adminAllOrders)
    const { loading, users } = useSelector((state) => state.adminAllUsers)


    useEffect(() => {
        dispatch(getAllProductAdmin())
        dispatch(getAllOrderAdmin())
        dispatch(getAllUsersAdmin())
    }, [dispatch])


    return (
        <Fragment>
            <div className="customContainer">
                <Row>
                    <Col>
                        <Link to="/admin/products/all">Products</Link>
                    </Col>
                    <Col>
                        <Link to="/admin/orders/all">Orders</Link>
                    </Col>
                    <Col>
                        <Link to="/admin/users/all">Users</Link>
                    </Col>

                </Row>

            </div>
        </Fragment>
    )
}


export default AdminDashboard