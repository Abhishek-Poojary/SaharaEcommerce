import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrderAdmin } from "../../actions/orderAction";
import {getAllProductAdmin} from "../../actions/productAction"
import { getAllUsersAdmin } from "../../actions/userAction";

const AdminDashboard =()=>{

    const dispatch=useDispatch();
    const {products} =useSelector((state)=>state.products)
    const {order} =useSelector((state)=>state.adminAllOrders)
    const {loading,users} =useSelector((state)=>state.adminAllUsers)

    if(loading===false)
    console.log(users)

    useEffect(()=>{
        dispatch(getAllProductAdmin())
        dispatch(getAllOrderAdmin())
        dispatch(getAllUsersAdmin())
    },[dispatch])

    
    return (
        <Fragment>
            <h1>fcdjibdid</h1>
        </Fragment>
    )
}


export default AdminDashboard