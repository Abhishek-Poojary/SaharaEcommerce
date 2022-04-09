import React, { Fragment, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, FormControl, Button, Form, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/userAction"
import WebFont from "webfontloader";
import './Header.css'
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


    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Libre Baskerville","Michroma", "Merienda", "Rajdhani", "Orbitron","Satisfy","Cinzel","Prata"],
            },
        });
    }, [])
    return (
        <Fragment>
            <Navbar collapseOnSelect sticky="top" expand="lg" bg="light" className="py-2 border-bottom" variant="light" >
                <Container>
                    <Navbar.Brand className="customBrand">SAHARA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="p-2 flex-fill">
                            <Nav.Link href="/">HOME</Nav.Link>
                            <Nav.Link href="/products">PRODUCTS</Nav.Link>
                        </Nav>
                        <Nav className="p-2 flex-fill">
                            <Form className="d-flex flex-fill" onSubmit={submitSearch}>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="me-3"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <Button variant="outline-success" type="submit">SEARCH</Button>
                            </Form>
                            {isAuthenticated ? (<Nav >

                                <NavDropdown title={user.name} >
                                    {user.userRole === "admin" ?
                                        <NavDropdown.Item href="/admin/dashboard"> Admin Dashboard</NavDropdown.Item>
                                        : []
                                    }
                                    <NavDropdown.Divider />
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

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Header;