import { Fragment, useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import "./Register.css"
import { useSelector, useDispatch } from 'react-redux'

import { userRegister } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [password, setPassword] = useState();


    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [phoneNoError, setPhoneNoError] = useState();
    const [passwordError, setPasswordError] = useState();

    const [buttonValue,setButtonValue] =useState("Register");

    const { isAuthenticated, error, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, isAuthenticated, navigate])

    const submitUser = (e) => {
        e.preventDefault();
        if (!name || !email || !phoneNo || !password || nameError || emailError || phoneNoError || passwordError) {
            if (!name || name === "" || nameError) {
                setNameError("Please enter your Name");
            }
            if (!email || email === "" || emailError) {
                setEmailError("Please enter your EmailId");
            }

            if (!phoneNo || phoneNo === "" || phoneNoError) {
                setPhoneNoError("Please enter your Phone Number");
            }
            if (!password || password === "" || passwordError) {
                setPasswordError("Password required");
            }
            
        } else {
            const data = {
                name,
                emailId: email,
                password,
                contactNumber: phoneNo
            }
           
            dispatch(userRegister(data));
        }

    }


    const verifyName = (event) => {
        let nameregex = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
        let value = event.target.value;
        if (!value || value === "") {
            setNameError("Please enter your Name");

        } else if (!value.match(nameregex)) {
            setNameError("Please enter a valid Name");

        } else if (value.length > 11) {
            setNameError("UserName cannot be greater than 11");

        } else {
            setNameError("");
            setName(value);
        }

    }


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


    const verifyPhoneNo = (event) => {
        let cnoRegex = /^[7-9]\d{9}$/
        let value = event.target.value;
        if (!value || value === "") {
            setPhoneNoError("Please enter your Phone Number");

        } else if (!value.match(cnoRegex)) {
            setPhoneNoError("Please enter a valid Phone Number");

        } else {
            setPhoneNoError("");
            setPhoneNo(value);
        }

    }
    const verifyPassword = (event) => {

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
            <div className="customContainer-2">
                <p className="customTitle-1-4">REGISTER</p>
                <Form className="customForm" onSubmit={submitUser}>

                    <Form.Group className="mb-3" >
                        <Form.Label>User Name</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" spellCheck="false" type="text" placeholder="Enter Name" onChange={(e) => verifyName(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {nameError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="email" placeholder="Enter email" onChange={(e) => verifyEmail(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="te" placeholder="Enter your Phone Number" onChange={(e) => verifyPhoneNo(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {phoneNoError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="password" placeholder="Enter Password" onChange={(e) => verifyPassword(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {passwordError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Text className="text-muted customTitle-1-6 ">
                            Never share your email or password with anyone else.<br/>
                            UserName should not be Greater than 11 words.<br/>
                            password should have atleast 9 words.
                        </Form.Text>
                    </Form.Group>
                    <Button   type="submit" className="customTitle-1-7 shadow-none" >
                        Register
                    </Button>
                </Form>
            </div>
        </Fragment>
    )
}

export default Register;