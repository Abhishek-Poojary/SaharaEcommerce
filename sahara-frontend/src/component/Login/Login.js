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

    const [loginError, setLoginError] = useState();


    const location = useLocation();
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(state => state.user);


    const loginUser = (e) => {
        e.preventDefault();
        if (!email || email === "" || emailError || !password || password === "" || passwordError) {
            if (!email || email === "" || emailError) {
                setEmailError("Please enter valid EmailId");
            }
            if (!password || password === "" || passwordError) {
                setPasswordError("Enter Valid Password");
            }
        }
        else {
            dispatch(userLogin(email, password))
        }


    }

    const newPath = location.search ? true : false

    useEffect(() => {
        if (isAuthenticated) {
            if (!newPath)
                navigate("/profile");
            else
                navigate("/shipping",{replace:true});
        }
        if (email && email !== "" && error) {
            setLoginError("Wrong Email or Password")
        }

    }, [dispatch, error, isAuthenticated, newPath,loading]);

    const verifyEmail = (event) => {
        setLoginError("")
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
        setLoginError("")
        let value = event.target.value;
        if (!value || value === "") {
            setPasswordError("Password required");

        } else if (value.length < 9) {
            setPasswordError("Password should be greater than 8 words");

        } else {
            setPasswordError("");
            setPassword(value);
        }

    }




    return (
        <Fragment>
            <div className="customContainer-1">
                <p className="customTitle-1-4">LOGIN</p>

                <Form className="customForm" onSubmit={loginUser}>
                    <Form.Group className="mb-3" >
                        <Form.Label >Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="customTitle-1-5 shadow-none"
                            onChange={(e) => verifyEmail(e)}
                        />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            className="customTitle-1-5 shadow-none"

                            onChange={(e) => verifyPassword(e)}
                        />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {passwordError}
                        </Form.Text>
                        <Form.Text className="customTitle-1-6 text-danger">
                            {loginError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Text className="text-muted customTitle-1-6 ">
                            never share your email or password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" className="customTitle-1-7 shadow-none"  >
                        Login
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