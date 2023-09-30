import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Bid All</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Auction List</Nav.Link>
                        <Nav.Link href="/addAuction">Add Auction</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;