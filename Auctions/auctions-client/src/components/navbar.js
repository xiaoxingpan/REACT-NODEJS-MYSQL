import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown, Row, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./helpers/AuthContext";


function NavbarComponent() {

    const navigate = useNavigate();
    const [authState, setAuthState] = useState(false);

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
                        <Nav.Link href="/itemList">Item List</Nav.Link>
                        <Nav.Link href="/">Auction List</Nav.Link>
                        <Nav.Link href="/addAuction">Add Auction</Nav.Link>
                    </Nav>

                    // hide if loggin
                    <AuthContext.Provider value={{ authState, setAuthState }}>
                        {!authState && (
                            <div >
                                <Button type="button" className="btn btn-outline-light me-2" onClick={handleLoginClick}>Login</Button>
                                <Button type="button" className="btn btn-warning" onClick={handleSignUpClick}>Sign-up</Button>
                            </div>)}
                    </AuthContext.Provider>

                    // showup when sign in
                    {localStorage.getItem("acessToken") && (
                        <><Navbar.Text className="px-3">
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
                            </NavDropdown></>
                    )}

                </Container>
            </Navbar>
        </div >
    );
}

export default NavbarComponent;