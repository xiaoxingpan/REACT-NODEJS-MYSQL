import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';


function NavbarComponent() {

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        // Navigate to the login.js page when the button is clicked
        navigate('/signup');
    };

    const handleLoginClick = () => {
        // Navigate to the login.js page when the button is clicked
        navigate('/login');
    };

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Bid All</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Auction List</Nav.Link>
                        <Nav.Link href="/addAuction">Add Auction</Nav.Link>
                    </Nav>

                    <div >
                        <Button type="button" className="btn btn-outline-light me-2" onClick={handleLoginClick}>Login</Button>
                        <Button type="button" className="btn btn-warning" onClick={handleSignUpClick}>Sign-up</Button>
                    </div>
                    // showup when sign in
                    {/* <Navbar.Text className="px-3">
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ color: 'white' }}>
                        <NavDropdown.Item href="/">Manage Auction</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Manage Users</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Bid</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown> */}

                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;