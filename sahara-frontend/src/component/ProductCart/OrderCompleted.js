import { Fragment } from "react";
import { Link } from "react-router-dom";

const OrderCompleted=()=>{


    return (
        <Fragment>
            <div className="customContainer">
                <h1>Ordered </h1>
                <Link to="/profile/orders">View Orders</Link>
                <Link to="/">Home</Link>
            </div>
        </Fragment>
    )
}


export default OrderCompleted;