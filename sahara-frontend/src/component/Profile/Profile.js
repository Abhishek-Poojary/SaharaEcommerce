import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import './Profile.css'
const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, error, user } = useSelector((state) => state.user);
    console.log(user)

    useEffect(()=>{
        if(user===null)
            navigate("/login")
    },[user])

    return (
        <Fragment>
         
            {isAuthenticated ? (<div className="customContainer-2-1-1">

                <h2>{user.name}</h2>
                <h4>{user.emailId}</h4>
                <h4>{user.contactNumber}</h4>
            </div>):[]}
        </Fragment>
    )
}


export default Profile;