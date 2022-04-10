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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [phoneNoError, setPhoneNoError] = useState();

    const { user } = useSelector((state) => state.user);
    const { loading, updateStatus, error } = useSelector((state) => state.profile)

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.emailId)
            setPhoneNo(user.contactNumber)  
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
        }else if (!name || !email || !phoneNo  || nameError || emailError || phoneNoError ) {
            if (!name || name === "" || nameError ) {
                setNameError("Please enter your Name");
            }
            if (!email || email === "" || emailError ) {
                setEmailError("Please enter your EmailId");
            }

            if (!phoneNo || phoneNo === "" || phoneNoError) {
                setPhoneNoError("Please enter your Phone Number");
            }
            
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
            setName(value);
        } else if (!value.match(nameregex)) {
            setNameError("Please enter a valid Name");
            setName(value);

        } else if (value.length > 11) {
            setNameError("UserName cannot be greater than 11");
            setTimeout(()=>{
                setNameError();
            },2000)
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
            setEmail(value);
        } else if (!value.match(eIdregex)) {
            setEmailError("Please enter a valid Emailid");
            setEmail(value);
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
            setPhoneNo(value);
        } else if (!value.match(cnoRegex)) {
            setPhoneNoError("Please enter a valid Phone Number");
            setPhoneNo(value);
        } else {
            setPhoneNoError("");
            setPhoneNo(value);
        }

    }

    return (
        <Fragment>
            <div className="customContainer-2">
            <p className="customTitle-1-4">Update Profile</p>
                <Form className="customForm" onSubmit={UpdateUser}>

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="text" placeholder="Enter Name" value={name} onChange={(e) => verifyName(e)} />
                        <Form.Text   className="customTitle-1-6 text-danger">
                            {nameError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  className="customTitle-1-5 shadow-none" type="email" placeholder="Enter email" value={email} onChange={(e) => verifyEmail(e)} />
                        <Form.Text   className="customTitle-1-6 text-danger">
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="number" placeholder="Enter your Phone Number" value={phoneNo} onChange={(e) => verifyPhoneNo(e)} />
                        <Form.Text   className="customTitle-1-6 text-danger">
                            {phoneNoError}
                        </Form.Text>
                    </Form.Group>


                    <Button  className="customTitle-1-7 shadow-none" type="submit">
                        Update
                    </Button>


                    <Button  className="customTitle-1-7 shadow-none" type="button" onClick={()=>navigate(-1)}>
                        Cancel
                    </Button>
                    <Form.Text   className="customTitle-1-6 text-danger">
                        {err}
                    </Form.Text>
                </Form>
            </div>
        </Fragment>
    );
}


export default UpdateProfile;