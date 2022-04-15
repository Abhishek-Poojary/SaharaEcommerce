import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteUserAdmin, getAllUsersAdmin } from "../../actions/userAction";
import {  useNavigate } from "react-router-dom";
import { Container,Table,Button} from 'react-bootstrap'
import { REQUEST_REMOVE_USER_ADMIN_RESET } from "../../constants/UserConstants";
const UsersPage = () => {
    const { loading, users } = useSelector((state) => state.adminAllUsers)
    const { status } = useSelector((state) => state.adminUser.deleteUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (status) {
            dispatch({ type: REQUEST_REMOVE_USER_ADMIN_RESET })
        }
        dispatch(getAllUsersAdmin())
    }, [dispatch, status])


    const updateRole = (id) => {

        navigate(`/admin/user/${id}`);

    }
    const deleteUser = (id) => {

        dispatch(deleteUserAdmin(id))

    }
    return (
        <Fragment>

            {loading === false && (
                <div className="customOrderList">
                    <Container>
                        <p className="customTitleProfile-1-3">Users DashBoard</p>


                        <Table responsive>
                            <thead>
                                <tr>
                                    <th><p className="customTitleUserOrder-1">No.</p></th>
                                    <th><p className="customTitleUserOrder-1">Name</p></th>
                                    <th><p className="customTitleUserOrder-1">Contact Number</p></th>
                                    <th><p className="customTitleUserOrder-1">Email</p></th>
                                    <th><p className="customTitleUserOrder-1">Role</p></th>
                                    <th><p className="customTitleUserOrder-1">Update</p></th>
                                    <th><p className="customTitleUserOrder-1">Delete</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td ><p className="customTitleOrderList-1">{index + 1}</p></td>
                                        <td>
                                            <p className="customTitleOrderList-1">{user.name}</p>
                                        </td>
                                        <td>
                                            <p className="customTitleOrderList-1">{user.contactNumber}</p>
                                        </td>
                                        <td>
                                            <p className="customTitleOrderList-1">{user.emailId}</p>
                                        </td>
                                        <td>
                                            <p className="customTitleOrderList-1">{user.userRole}</p>
                                        </td>
                                        <td>
                                            <Button onClick={() => updateRole(user._id)}   >Update</Button>

                                        </td>
                                        <td>
                                            <Button onClick={() => deleteUser(user._id)}  >Delete</Button>

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

export default UsersPage