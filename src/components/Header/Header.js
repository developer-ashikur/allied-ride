import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/'><h2>Allied Ride</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/destination'>Destination</Nav.Link>
                        <Nav.Link>Blog</Nav.Link>
                        <Nav.Link>Contact</Nav.Link>
                        <Link to='/login' className='btn btn-danger'>Login</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;