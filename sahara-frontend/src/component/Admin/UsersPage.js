import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteUserAdmin, getAllUsersAdmin } from "../../actions/userAction";
import { Link } from "react-router-dom";
import {Col,Row} from 'react-bootstrap'
import { REQUEST_REMOVE_USER_ADMIN_RESET } from "../../constants/UserConstants";
const UsersPage = () => {
    const { loading, users } = useSelector((state) => state.adminAllUsers)
    const { status } = useSelector((state) => state.adminUser.deleteUser)
    const dispatch = useDispatch();

    useEffect(() => {
        if(status){
            dispatch({type:REQUEST_REMOVE_USER_ADMIN_RESET})
        }
        dispatch(getAllUsersAdmin())
    }, [dispatch,status])


    const deleteUser=(id)=>{
        
        dispatch(deleteUserAdmin(id))

    }
    return (
        <Fragment>

            {loading === false && (
                users && users.map((user) => (
                    <Row key={user._id}>
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
                            <Link to={`/admin/user/${user._id}`}>Update User Role</Link>
                        </Col>
                        <Col>
                            <button onClick={() => deleteUser(user._id)}>Delete User</button>
                        </Col>
                    </Row>
                ))
            )}
        </Fragment>
    )
}

export default UsersPage