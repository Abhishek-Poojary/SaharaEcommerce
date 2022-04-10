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

    const [incorrectError, setIncorrectError] = useState();

    const { loading, updateStatus, error } = useSelector((state) => state.profile)

    const verifyPassword = (event) => {
        setIncorrectError("");
        let value = event.target.value;
        if (!value || value === "") {
            setPasswordError("Password required");

        }else if (value.length < 9) {
            setPasswordError("Password should be greater than 8 words");

        } else {
            setPasswordError("");
            setPassword(value);
        }

    }

    const verifyNewPassword = (event) => {
        setIncorrectError("");
        let value = event.target.value;
        if (!value || value === "") {
            setNewPasswordError("New Password required");

        }else if (value.length < 9) {
            setNewPasswordError("Password should be greater than 8 words");

        } else {
            setNewPasswordError("");
            setNewPassword(value);
        }

    }

    const verifyConfirmPassword = (event) => {
        setIncorrectError("");
        let value = event.target.value;
        if (!value || value === "") {
            setConfirmPasswordError("Confirm Password required");

        }else if (value.length < 9) {
            setConfirmPasswordError("Password should be greater than 8 words");

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

        if(password && password !== "" &&  error){
            setIncorrectError(error)
        }

    }, [dispatch, updateStatus, navigate, error])


    const updateUser = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword){
            setConfirmPasswordError("passwords are not equal")
        }else if(!password || password === "" || !newPassword || newPassword === "" || !confirmPassword || confirmPassword === "" 
        || passwordError || newPasswordError || confirmPasswordError){
            if(!password || password === "" ||  passwordError  ){
                setPasswordError("Password required");
    
            }
            if(!newPassword || newPassword === "" || newPasswordError ){
                setNewPasswordError("newPassword required");
               
            }
            if(!confirmPassword || confirmPassword === "" || confirmPasswordError){
                setConfirmPasswordError("Confirm Password required");
               
            }

        }else{
            const data={
                oldPassword:password,
                newPassword:newPassword,
                confirmPassword:confirmPassword
            }
            dispatch(userPasswordUpdate(data));

            if(password && password !== "" &&  error){
                setIncorrectError(error)
            }
        }



    }
    return (
        <Fragment>
            <div className="customContainer-2">
                <p className="customTitle-1-4">Update Password</p>
                <Form className="customForm" onSubmit={updateUser}>


                    <Form.Group className="mb-3" >
                        <Form.Label> old Password</Form.Label>
                        <Form.Control  className="customTitle-1-5 shadow-none" type="password" placeholder="Enter Password"  onChange={(e) => verifyPassword(e)} />
                        <Form.Text  className="customTitle-1-6 text-danger">
                            {passwordError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>New Password</Form.Label>
                        <Form.Control  className="customTitle-1-5 shadow-none" type="password" placeholder="Enter Password"  onChange={(e) => verifyNewPassword(e)} />
                        <Form.Text  className="customTitle-1-6 text-danger">
                            {newPasswordError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control   className="customTitle-1-5 shadow-none" type="password" placeholder="Enter Password"  onChange={(e) => verifyConfirmPassword(e)} />
                        <Form.Text  className="customTitle-1-6 text-danger">
                            {confirmPasswordError}
                        </Form.Text>
                        <Form.Text  className="customTitle-1-6 text-danger">
                            {incorrectError}
                        </Form.Text>
                    </Form.Group>

                    <Button  className="customTitle-1-7 shadow-none" type="submit">
                        Submit
                    </Button>

                    <Form.Group className="mb-3" >
                        <Form.Text className="text-muted customTitle-1-6 ">
                            password should have atleast 9 words.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </Fragment>
    )
}


export default UpdatePassword;