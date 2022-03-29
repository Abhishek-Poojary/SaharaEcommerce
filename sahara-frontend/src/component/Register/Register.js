import { Fragment, useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import "./Register.css"
import { useSelector, useDispatch } from 'react-redux'

import { userRegister } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [password, setPassword] = useState();


    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [phoneNoError, setPhoneNoError] = useState();
    const [passwordError, setPasswordError] = useState();

    const { isAuthenticated,error,user } = useSelector((state) => state.user);

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
    },[dispatch,isAuthenticated,navigate])

    const submitUser = (e) => {
        e.preventDefault();
        const data = {
            name,
            emailId: email,
            password,
            contactNumber: phoneNo
        }
        dispatch(userRegister(data));
    }


    const verifyName = (event) => {
        let nameregex = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
        let value = event.target.value;
        if (!value || value === "") {
            setNameError("Please enter your Name");

        } else if (!value.match(nameregex)) {
            setNameError("Please enter a valid Name");

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

        } else {
            setPasswordError("");
            setPassword(value);
        }

    }






    return (
        <Fragment>
            <div className="customContainer-2">
                <h3>Create Account</h3>
                <Form className="customForm" onSubmit={submitUser}>

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => verifyName(e)} />
                        <Form.Text className="text-danger">
                            {nameError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => verifyEmail(e)} />
                        <Form.Text className="text-danger">
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="te" placeholder="Enter your Phone Number" onChange={(e) => verifyPhoneNo(e)} />
                        <Form.Text className="text-danger">
                            {phoneNoError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={(e) => verifyPassword(e)} />
                        <Form.Text className="text-danger">
                            {passwordError}
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

export default Register;