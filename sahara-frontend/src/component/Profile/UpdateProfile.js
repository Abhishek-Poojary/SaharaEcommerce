import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, Fragment } from 'react'
import { Form, Button } from 'react-bootstrap'
import { loadUser, userProfileUpdate } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import {REQUEST_TO_RESET_PROFILE} from "../../constants/UserConstants"
const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [err, setError] = useState();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNo, setPhoneNo] = useState();

    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [phoneNoError, setPhoneNoError] = useState();

    const { user } = useSelector((state) => state.user);
    const { loading, updateStatus, error } = useSelector((state) => state.profile)

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.emailId)
            setPhoneNo(user.contactNumber)  //currently getting a error in here for setting the values 
        }




        if (loading === false && updateStatus) {
            dispatch(loadUser());

            navigate("/profile")

            dispatch({type:REQUEST_TO_RESET_PROFILE})
        }



    }, [dispatch, updateStatus, navigate, error, user])


    const UpdateUser = (e) => {
        e.preventDefault();
        if (user.name === name && user.emailId === email && user.contactNumber === phoneNo) {
            setError("No Change has been made")
        } else {
            const data = {
                name,
                emailId: email,
                contactNumber: phoneNo
            }
            dispatch(userProfileUpdate(data));
        }

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

    return (
        <Fragment>
            <div className="customContainer-2">
                <h3>Update Profile</h3>
                <Form className="customForm" onSubmit={UpdateUser}>

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => verifyName(e)} />
                        <Form.Text className="text-danger">
                            {nameError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => verifyEmail(e)} />
                        <Form.Text className="text-danger">
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="te" placeholder="Enter your Phone Number" value={phoneNo} onChange={(e) => verifyPhoneNo(e)} />
                        <Form.Text className="text-danger">
                            {phoneNoError}
                        </Form.Text>
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update
                    </Button>


                    <Button variant="secondary" type="button" onClick={()=>navigate(-1)}>
                        Cancel
                    </Button>
                    <Form.Text className="text-danger">
                        {err}
                    </Form.Text>
                </Form>
            </div>
        </Fragment>
    );
}


export default UpdateProfile;