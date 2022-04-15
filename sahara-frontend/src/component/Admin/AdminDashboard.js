import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrderAdmin } from "../../actions/orderAction";
import { getAllProductAdmin } from "../../actions/productAction"
import { getAllUsersAdmin } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Button, Container } from 'react-bootstrap'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading: loading1, products } = useSelector((state) => state.products)
    const { loading: loading2, order } = useSelector((state) => state.adminAllOrders)
    const { loading, users } = useSelector((state) => state.adminAllUsers)


    useEffect(() => {
        dispatch(getAllProductAdmin())
        dispatch(getAllOrderAdmin())
        dispatch(getAllUsersAdmin())
    }, [dispatch])


    const goToProducts = () => {
        navigate("/admin/products/all");
    }
    const goToOrders = () => {
        navigate("/admin/orders/all");
    }
    const goToUsers = () => {
        navigate("/admin/users/all");
    }

    return (
        <Fragment>

            {

                (loading === false && loading1 === false && loading2 === false) && (
                    <Container>
                        <div className="customContainerProfile-1">
                            <p className="customTitleProfile-1-3">DashBoard</p>

                            <Row >

                                <Col xs={12} md={6}>
                                    <Row>
                                        <Button className="customButtonProfile-1-1" onClick={goToProducts}>
                                            Products DashBoard
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button className="customButtonProfile-1-1" onClick={goToOrders}>
                                            Order DashBoard
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button className="customButtonProfile-1-1" onClick={goToUsers}>
                                            User DashBoard
                                        </Button>
                                    </Row>

                                </Col>
                                <Col xs={12} md={6}>
                                    <Row>
                                        <Col xs="auto"  md={8}>
                                            <p className="customTitleProfile">Total Products</p>
                                        </Col>

                                        <Col md={4}>
                                            <p className="customTitleProfile">{products.length}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <p  className="customTitleProfile" >Total Orders</p>
                                        </Col>
                                        <Col md={4}>
                                            <p  className="customTitleProfile" >{order.length}</p>

                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <p  className="customTitleProfile" >Total Users  </p>
                                        </Col>
                                        <Col md={4}>
                                            <p  className="customTitleProfile" > {users.length} </p>

                                        </Col>

                                    </Row>

                                </Col>
                            </Row>
                        </div>
                    </Container>
                )

            }



        </Fragment >
    )
}


export default AdminDashboard