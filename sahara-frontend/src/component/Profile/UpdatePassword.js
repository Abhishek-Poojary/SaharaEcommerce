import { loadUser, userPasswordUpdate } from "../../actions/userAction";
import { Form,Button } from "react-bootstrap";
import { useEffect,useState,Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {REQUEST_TO_RESET_PROFILE} from "../../constants/UserConstants"

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();

    const [newPassword, setNewPassword] = useState();
    const [newPasswordError, setNewPasswordError] = useState();

    const [confirmPassword, setCPassword] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const { loading, updateStatus, error } = useSelector((state) => state.profile)

    const verifyPassword = (event) => {

        let value = event.target.value;
        if (!value || value === "") {
            setPasswordError("Password required");

        } else {
            setPasswordError("");
            setPassword(value);
        }

    }

    const verifyNewPassword = (event) => {

        let value = event.target.value;
        if (!value || value === "") {
            setNewPasswordError("New Password required");

        } else {
            setNewPasswordError("");
            setNewPassword(value);
        }

    }

    const verifyConfirmPassword = (event) => {

        let value = event.target.value;
        if (!value || value === "") {
            setConfirmPasswordError("Confirm Password required");

        } else {
            setConfirmPasswordError("");
            setCPassword(value);
        }

    }

    useEffect(() => {
        

        if (loading === false && updateStatus) {
            dispatch(loadUser());

            navigate("/profile")

            dispatch({ type: REQUEST_TO_RESET_PROFILE })
        }



    }, [dispatch, updateStatus, navigate, error])


    const updateUser = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword){
            setConfirmPasswordError("password are not equal")
        }else{
            const data={
                oldPassword:password,
                newPassword:newPassword,
                confirmPassword:confirmPassword
            }
            dispatch(userPasswordUpdate(data));
        }



    }
    return (
        <Fragment>
            <div className="customContainer-2">
                <h3>Update Password</h3>
                <Form className="customForm" onSubmit={updateUser}>


                    <Form.Group className="mb-3" >
                        <Form.Label> old Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"  onChange={(e) => verifyPassword(e)} />
                        <Form.Text className="text-danger">
                            {passwordError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"  onChange={(e) => verifyNewPassword(e)} />
                        <Form.Text className="text-danger">
                            {newPasswordError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"  onChange={(e) => verifyConfirmPassword(e)} />
                        <Form.Text className="text-danger">
                            {confirmPasswordError}
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Fragment>
    )
}


export default UpdatePassword;