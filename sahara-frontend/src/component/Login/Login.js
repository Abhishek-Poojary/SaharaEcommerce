import React, { Fragment, useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css"
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../actions/userAction'
const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const { error, user, isAuthenticated } = useSelector(state => state.user);


    const loginUser = (e) => {
        e.preventDefault();

        dispatch(userLogin(email, password))

    }

    const newPath = location.search ? true : false

    useEffect(() => {
        if (isAuthenticated) {
            if (!newPath)
                navigate("/profile");
            else
                navigate("/shipping");
        }
    }, [dispatch, error, isAuthenticated, newPath]);

    const verifyEmail = (event) => {
        let eIdregex = /^[a-z]+[@][a-z]+\.[com]+$/;
        let value = event.target.value;
        if (!value || value === "") {
            setEmailError("Please enter your EmailId");

        } else if (!value.match(eIdregex)) {
            setEmailError("Please enter a valid Emailid");

        } else {
            setEmailError("");
            setEmail(value);
        }

    }
    // need to imlement to show error to user if password is wrong
    const verifyPassword = (event) => {

        let value = event.target.value;
        if (!value || value === "") {
            setPasswordError("Password required");

        } else {
            setPasswordError("");
            setPassword(value);
        }

    }




    return (
        <Fragment>
            <div className="customContainer-1">


                <Form className="customForm" onSubmit={loginUser}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"

                            onChange={(e) => verifyEmail(e)}
                            required />
                        <Form.Text className="text-danger">
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"

                            required
                            onChange={(e) => verifyPassword(e)}
                        />
                        <Form.Text className="text-danger">
                            {passwordError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Text className="text-muted">
                            never share your email or password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit"  >
                        Submit
                    </Button>


                </Form>


            </div>

            <div className="customLink">
                <p>Dont have a account? </p> &nbsp;&nbsp;<Link to={"/register"} className="customStyle"> Create Account</Link>
            </div>
        </Fragment>
    )
}

export default Login;