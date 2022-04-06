import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row, Button } from 'react-bootstrap'
import { getUserDetailsAdmin } from "../../actions/userAction";
import { updateUserRoleAdmin } from "../../actions/userAction";
import { REQUEST_USER_ROLE_UPDATE_ADMIN_RESET } from "../../constants/UserConstants";
const UserUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading,user} =useSelector((state)=>state.adminUser.selected)
    const {status} =useSelector((state)=>state.adminUser.roleUpdate)
    const dispatch = useDispatch();
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if(status){
            navigate('/admin/users/all')
            dispatch({type:REQUEST_USER_ROLE_UPDATE_ADMIN_RESET})
           
        }

        dispatch(getUserDetailsAdmin(id))

    }, [dispatch, id,status,navigate])


    const updateRole = (e) => {
        e.preventDefault();
        const data = {
            userRole,
        }
        dispatch(updateUserRoleAdmin(id,data));
    }

    return (
        <Fragment>
            {loading === false && (

                <Row >
                    <Col>
                        <h2>Name :{user.name}</h2>
                    </Col>
                    <Col>
                        {user.contactNumber}
                    </Col>
                    <Col>
                        {user.email}
                    </Col>
                    <Col>
                        {user.userRole}
                    </Col>
                    <Col>
                        <form onSubmit={updateRole}>
                            <h1>Update Role</h1>

                            <div>

                                <select onChange={(e) => setUserRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    {user.userRole === "user" && (
                                        <option value="admin">Admin</option>
                                    )}

                                    {user.userRole === "admin" && (
                                        <option value="user">user</option>
                                    )}
                                </select>
                            </div>

                            <Button type="submit" >Update </Button>
                        </form>
                    </Col>
                </Row>

            )}
        </Fragment>
    )
}

export default UserUpdate