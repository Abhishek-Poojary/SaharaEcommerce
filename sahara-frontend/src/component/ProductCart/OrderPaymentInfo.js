
import { Fragment, useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newOrder } from "../../actions/orderAction";


const OrderPaymentInfo = () => {

    const [card, setCard] = useState();
    const [expMonth, setExpMonth] = useState();
    const [expYear, setExpYear] = useState();
    const [cvv, setCVV] = useState();


    const [cardError, setCardError] = useState();
    const [expMonthError, setExpMonthError] = useState();
    const [expDateError, setExpDateError] = useState();
    const [cvvError, setCVVError] = useState();

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const sessionInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const data = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: sessionInfo.subtotal,
        taxPrice: sessionInfo.tax,
        shippingPrice: sessionInfo.shippingCharges,
        totalPrice: sessionInfo.totalPrice,
        paymentInfo: {
            status: "success"
        }
    }


    const userOrder = (e) => {
        e.preventDefault();
        verifyDate();

        if (cardError || expMonthError || expDateError || cvvError || !card || card === "" || !cvv || cvv === "") {
            if (!card || card === "" || cardError) {
                setCardError("Please enter a valid Card Number");

            }
            if (!cvv || cvv === "" || cvvError) {
                setCVVError("Please enter a valid CVV");

            }
            if (expMonthError !== "" || expDateError !== "") {

            }
        } else {

            dispatch(newOrder(data))

            navigate("/order/success",{replace:true})

        }

    }

    const verifyCreditCard = (event) => {
        let regex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

        let value = event.target.value;
        if (!value || value === "") {
            setCardError("Please enter card number");

        } else if (!value.match(regex)) {
            setCardError("Please enter a valid Card Number");

        } else {
            setCardError("");
            setCard(value);
        }

    }



    const verifyCVV = (event) => {

        let regex = /^[0-9]{3,4}$/;

        let value = event.target.value;
        if (!value || value === "") {
            setCVVError("Please enter CVV");

        } else if (!value.match(regex)) {
            setCVVError("Please enter a valid CVV");

        } else {
            setCVVError("");
            setCVV(value);
        }

    }


    const verifyDate = () => {

        if (!expYear || expYear === "0") {
            setExpDateError("Please select a year");

        } else if (!expMonth || expMonth === "0") {
            setExpDateError("");
            setExpMonthError("Please select month");
        }
        else if (year > expYear || (year == expYear && month > expMonth)) {

            setExpMonthError("");
            setExpDateError("The expiry date is before today's date. Please select a valid expiry date");

        } else {
            setExpMonthError("");
            setExpDateError("");

        }
    }




    return (
        <Fragment>
            <div className="customContainer-2">
            <p className="customTitle-1-4">Payment-Info</p>
                <Form className="customForm" onSubmit={userOrder}>

                    <Form.Group className="mb-3" >
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="number" placeholder="Enter Credit Card Number" onChange={(e) => verifyCreditCard(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {cardError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Expiry Month</Form.Label>
                        <Form.Select className="customTitle-1-5 shadow-none" aria-label="Default select example" value={expMonth} onChange={(e) => setExpMonth(e.target.value)}>
                            <option value="0">Enter month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </Form.Select>
                        <Form.Text className="customTitle-1-6 text-danger">
                            {expMonthError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Expiry Year</Form.Label>
                        <Form.Select className="customTitle-1-5 shadow-none" aria-label="Default select example" value={expYear} onChange={(e) => setExpYear(e.target.value)}>
                            <option value="0">Enter year</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                        </Form.Select>
                        <Form.Text className="customTitle-1-6 text-danger">
                            {expDateError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>CVV</Form.Label>
                        <Form.Control className="customTitle-1-5 shadow-none" type="te" placeholder="" onChange={(e) => verifyCVV(e)} />
                        <Form.Text className="customTitle-1-6 text-danger">
                            {cvvError}
                        </Form.Text>
                    </Form.Group>




                    <Button className="customTitle-1-7 shadow-none" type="submit">
                        Order
                    </Button>
                </Form>
            </div>
        </Fragment>
    )
}


export default OrderPaymentInfo