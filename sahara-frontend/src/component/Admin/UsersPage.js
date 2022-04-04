import { Fragment } from "react"
import { useSelector } from "react-redux"

const UsersPage =()=>{
    const {loading,users} =useSelector((state)=>state.adminAllUsers)
    
    if(loading===false)
    console.log(users)
    return (
        <Fragment>
            <h1>Hello 3</h1>
        </Fragment>
    )
}

export default UsersPage