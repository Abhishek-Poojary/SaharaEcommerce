import { Fragment } from "react"
import { Form, Button } from 'react-bootstrap'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { addUserAddress } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom"

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state); //button is only dependent on this fix
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


    const [phoneNoError, setPhoneNoError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState(""); 
    const [countryError, setCountryError] = useState("");
    const [pinCodeError, setPinCodeError] = useState("");


    const verifyAddress = (event) => {
        let value = event.target.value;
        setAddress(value)
        if (!address || address === "") {
            setAddressError("Please Enter Address");

        } else {
            setAddressError("");

        }
    }

    const verifyCity = (event) => {
        let value = event.target.value;
        setCity(value)

        if (!city || city === "") {
            setCityError("Please enter City");

        } else {
            setCityError("");

        }
    }

    const verifyPinCode = (event) => {
        let value = event.target.value;
       
        if (!pinCode || pinCode === "") {
            setPinCodeError("Please enter Pincode");

        }else {
            setPinCodeError("");
           

        }
        setPinCode(value)
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

    const submitAddress = (e) => {
        e.preventDefault();
        if (!address || address === "" || !city || city === "" || !pinCode || pinCode === "" || !phoneNo || phoneNo === "" ||
        !state || state==="" || !country || country==="" ||addressError || cityError || stateError|| countryError||pinCodeError||phoneNoError )    {
            if (!address || address === "" || addressError) {
                setAddressError("Please Enter Address");
            } 
            if (!city || city === "" || cityError) {
                setCityError("Please enter City");
    
            }
            if (!pinCode || pinCode === "" || pinCodeError) {
                setPinCodeError("Please enter Pincode");
    
            }
            if (!phoneNo || phoneNo === "" || phoneNoError) {
                setPhoneNoError("Please enter your Phone Number");
    
            }

            if ( !state || state === "" ) {
                setStateError("Please select State");
    
            } else {
                setStateError("");
    
            }

            
            if ( !country || country ==="" ) {
                setCountryError("Please select Country");
    
            } else {
                setCountryError("");
    
            }


        } else {
            e.preventDefault();
            const data = {
                address,
                city,
                pinCode,
                phoneNo,
                state,
                country
            }
            dispatch(addUserAddress(data))

            navigate("/order/confirm",{replace:true})
        }





    }

    return (
        <Fragment>
            <div className="customContainer-2">
                <p className="customTitle-1-4">Add Address</p>
                <Form  onSubmit={submitAddress} >

                    <Form.Group className="mb-3" >
                        <Form.Label>Address</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="text" placeholder="Enter Address" value={address} onChange={(e) => verifyAddress(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {addressError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>City</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="text" placeholder="Enter City" value={city} onChange={(e) => verifyCity(e)} />
                        <Form.Text className="text-danger">
                            {cityError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="number" placeholder="Enter your Phone Number" value={phoneNo} onChange={(e) => verifyPhoneNo(e)} />
                        <Form.Text className="text-danger">
                            {phoneNoError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>PinCode</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="number" placeholder="Enter Pincode" value={pinCode} onChange={(e) => verifyPinCode(e)} />
                        <Form.Text className="text-danger">
                            {pinCodeError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Country</Form.Label>

                        <Form.Select aria-label="Default select example" className="customTitle-1-5 shadow-none" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Country</option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </Form.Select>
                        <Form.Text className="text-danger">
                            {countryError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>State</Form.Label>

                        <Form.Select aria-label="Default select example" className="customTitle-1-5 shadow-none" value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="">State</option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </Form.Select>
                        <Form.Text className="text-danger">
                            {stateError}
                        </Form.Text>
                    </Form.Group>

                    <Button  className="customButtonProfile-1-1"  type="submit" >
                        Confirm
                    </Button>
                </Form>
            </div>
        </Fragment>
    )
}


export default Shipping