import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav, Container, Form, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarComp(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }



    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Cloud Notes</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        {!localStorage.getItem('authToken') ? <div>
                            <Button className='mx-1' as={Link} to="/login">Login</Button>
                            <Button className='mx-1' as={Link} to="/signup">Signup</Button>
                        </div> : <div>
                            <Button className='mx-1' disabled variant="light">{props.name}</Button>
                            <Button className='mx-1' onClick={handleLogout}>Logout</Button>
                        </div>}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp;