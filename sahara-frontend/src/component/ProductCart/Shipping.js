import { Fragment } from "react"
import { Form, Button } from 'react-bootstrap'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { addUserAddress } from "../../actions/cartAction";
import {useNavigate} from "react-router-dom"

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state); //button is only dependent on this fix
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


    const [phoneNoError, setPhoneNoError] = useState();


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

    const submitAddress = (e) => {
        e.preventDefault();
        const data={
            address,
            city,
            pinCode,
            phoneNo,
            state,
            country
        }
        dispatch(addUserAddress(data))

        navigate("/order/confirm")
    }

    return (
        <Fragment>
            <div className="customContainer-2">
                <h3>Add Address</h3>
                <Form className="customForm" onSubmit={submitAddress} >

                    <Form.Group className="mb-3" >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter your Phone Number" value={phoneNo} onChange={(e) => verifyPhoneNo(e)} />
                        <Form.Text className="text-danger">
                            {phoneNoError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>PinCode</Form.Label>
                        <Form.Control type="number" placeholder="Enter Pincode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Country</Form.Label>

                        <Form.Select aria-label="Default select example" value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="">Country</option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>State</Form.Label>

                        <Form.Select aria-label="Default select example" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">State</option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={state ? false : true}>
                        Submit
                    </Button>
                </Form>
            </div>
        </Fragment>
    )
}


export default Shipping