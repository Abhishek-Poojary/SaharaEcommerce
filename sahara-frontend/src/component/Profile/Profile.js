import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row } from "react-bootstrap"
const Profile = () => {
    const navigate = useNavigate();
    const { isAuthenticated, error, user, loading } = useSelector((state) => state.user);




    return (
        <Fragment>
            {loading === false && (
                <Container>
                    <div className="customContainerProfile-1">
                        <p className="customTitleProfile-1-3">User Profile</p>

                        <Row >

                            <Col xs={12} md={6}>
                                <Row>
                                    <Button className="customButtonProfile-1-1">
                                        Update profile
                                    </Button>
                                </Row>
                                <Row>
                                    <Button className="customButtonProfile-1-1">
                                        Change Password
                                    </Button>
                                </Row>
                                <Row>
                                    <Button className="customButtonProfile-1-1">
                                        Orders
                                    </Button>
                                </Row>



      


                            </Col>
                            <Col xs={12} md={6}>
                                <Row>
                                    <Col xs="auto">
                                        <p className="customTitleProfile-1-2">Welcome,</p>
                                    </Col>

                                    <Col>
                                        <p className="customTitleProfile"> {user.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="customTitleProfile-1" >UserName :- </p>
                                    </Col>
                                    <Col>
                                        <p className="customTitleProfile-1-1" >{user.name} </p>

                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <p className="customTitleProfile-1" >EmailId :- </p>
                                    </Col>
                                    <Col>
                                        <p className="customTitleProfile-1-1" > {user.emailId} </p>

                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <p className="customTitleProfile-1" >Contact Number :- </p>
                                    </Col>
                                    <Col>
                                        <p className="customTitleProfile-1-1" >{user.contactNumber} </p>

                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>


            )}

        </Fragment>
    )
}


export default Profile;