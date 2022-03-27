import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, FormControl, Button, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';



const Header = ({}) => {
    const navigate= useNavigate();
    const [keyword,setKeyword]=useState("");
    console.log(keyword);
    const submitSearch=(e)=>{
    e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`);
        }
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
                                onChange={(e)=> setKeyword(e.target.value)}
                            />
                            <Button variant="outline-primary" type="submit">Search</Button>
                        </Form>
                        <Nav >
                            <Nav.Link href="">Profile</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Header;