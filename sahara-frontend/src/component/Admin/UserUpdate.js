import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Button, Container } from 'react-bootstrap'
import { getUserDetailsAdmin } from "../../actions/userAction";
import { updateUserRoleAdmin } from "../../actions/userAction";
import { REQUEST_USER_ROLE_UPDATE_ADMIN_RESET } from "../../constants/UserConstants";
const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, user } = useSelector((state) => state.adminUser.selected)
    const { status } = useSelector((state) => state.adminUser.roleUpdate)
    const dispatch = useDispatch();
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if (status) {
            navigate('/admin/users/all')
            dispatch({ type: REQUEST_USER_ROLE_UPDATE_ADMIN_RESET })

        }

        dispatch(getUserDetailsAdmin(id))

    }, [dispatch, id, status, navigate])


    const updateRole = (e) => {
        e.preventDefault();
        const data = {
            userRole,
        }
        dispatch(updateUserRoleAdmin(id, data));
    }

    return (
        <Fragment>
            {loading === false && (
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <Row>
                                <Col xs="auto" md={4}>
                                    <p className="customTitleProfile">Name</p>
                                </Col>

                                <Col md={4}>
                                    <p className="customTitleProfile">{user.name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <p className="customTitleProfile" >Contact Number</p>
                                </Col>
                                <Col md={4}>
                                    <p className="customTitleProfile" > {user.contactNumber}</p>

                                </Col>

                            </Row>
                            <Row>
                                <Col md={4}>
                                    <p className="customTitleProfile" >User Role  </p>
                                </Col>
                                <Col md={4}>
                                    <p className="customTitleProfile" >  {user.userRole} </p>

                                </Col>

                            </Row>


                        </Col>
                        <Col xs={12} md={4}>
                            <Row>
                                <Col md={12}>
                                    <form onSubmit={updateRole}>
                                        <p className="customTitleProfile">Update Role</p>

                                        <div>

                                            <select className="customTitle-1-5" onChange={(e) => setUserRole(e.target.value)}>
                                                <option value="">Choose Role</option>
                                                {user.userRole === "user" && (
                                                    <option value="admin">Admin</option>
                                                )}

                                                {user.userRole === "admin" && (
                                                    <option value="user">user</option>
                                                )}
                                            </select>
                                        </div>

                                        <Button  className="customButtonProfile-1-1" type="submit" >Update </Button>
                                    </form>
                                </Col>

                            </Row>


                        </Col>
                    </Row>
                </Container>


            )}
        </Fragment>
    )
}

export default UserUpdate