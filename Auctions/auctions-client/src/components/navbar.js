import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function NavbarComponent() {

    const navigate = useNavigate();
    const { loginStatus, username, role, setLoginStatus, setUsername, setRole, setUserId } = useContext(AuthContext);
    const isAdmin = role.includes("admin");


    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const navigateToItemList = () => {
        navigate('/itemList');
    };

    const navigateToAddItem = () => {
        navigate('/addItem');
    };

    const navigateToHome = () => {
        navigate('/');
    };

    const handleLogout = () => {
        setLoginStatus(false);
        setUsername("");
        setRole("");
        setUserId("");
        localStorage.clear();
        navigateToHome();
    };

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg">
                <Container>
                    <Navbar.Brand onClick={navigateToHome}>Bid All</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={navigateToItemList}>Item List</Nav.Link>
                        {isAdmin ? (<Nav.Link onClick={navigateToAddItem}>Add Item</Nav.Link>) : (<></>)}
                    </Nav>

                    {loginStatus ? (
                        <NavDropdown title={username} id="basic-nav-dropdown" style={{ color: 'white' }}>
                            {isAdmin ? (<div><NavDropdown.Item href="/">Manage Auction</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Manage Users</NavDropdown.Item></div>) : (<></>)}
                            <NavDropdown.Item href="#action/3.2">My Account</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">My Actions</NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>) :
                        (<div>
                            <Button type="button" className="btn btn-outline-light me-2" onClick={handleLoginClick}>Login</Button>
                            <Button type="button" className="btn btn-warning" onClick={handleSignUpClick}>Sign-up</Button>
                        </div>)}
                </Container>
            </Navbar>
        </div >
    );
}

export default NavbarComponent;