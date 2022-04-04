import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, FormControl, Button, Form, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/userAction"


const Header = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const { isAuthenticated, user } = useSelector(state => state.user);

    const submitSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }
        else {
            navigate(`/products`);
        }
    }


    const logout = () => {
        dispatch(logoutUser());
        navigate('/');
    }



    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Sahara</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/products">Products</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={submitSearch}>
                            <FormControl
                                type="Search"
                                placeholder="Search"
                                className="me-3"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button variant="outline-primary" type="submit">Search</Button>
                        </Form>
                        {isAuthenticated ? (<Nav >

                            <NavDropdown title={user.name} >
                                {user.userRole === "admin" ?
                                    <NavDropdown.Item href="/admin/dashboard">Dashboard</NavDropdown.Item>
                                    : []
                                }
                                <NavDropdown.Item href="/profile">my Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>

                            </NavDropdown>

                        </Nav>

                        ) : (<Nav >
                            <Nav.Link href="/login">Login</Nav.Link>

                        </Nav>
                        )}



                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Header;