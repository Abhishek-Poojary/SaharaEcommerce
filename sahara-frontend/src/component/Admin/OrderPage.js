import { Fragment } from "react"
import { useSelector } from "react-redux"

const OrderPage =()=>{
    const {loading,order} =useSelector((state)=>state.adminAllOrders)
    
    if(loading===false)
    console.log(order)
    return (
        <Fragment>
            <h1>Hello 2</h1>
        </Fragment>
    )
}

export default OrderPage