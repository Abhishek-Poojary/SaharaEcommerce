import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { Link } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, error, user, loading } = useSelector((state) => state.user);




    return (
        <Fragment>
            {loading === false && (
                <div className="customContainer-2-1-1">

                    <h2>{user.name}</h2>
                    <h4>{user.emailId}</h4>
                    <h4>{user.contactNumber}</h4>
                    <div>
                        <Link to="/profile/update">Update profile</Link>
                        <br />
                        <Link to="/profile/password/update">Change Password</Link>
                        <br />
                        <Link to="">Orders</Link>
                    </div>
                </div>
            )}

        </Fragment>
    )
}


export default Profile;