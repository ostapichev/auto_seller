import { FC, useState } from 'react';
import { NavLink } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import { Col, Container, Nav, Navbar } from 'react-bootstrap';

import { Currencies } from '../Currencies/Currencies';
import Offcanvas from 'react-bootstrap/Offcanvas';

import logo from '../../assets/images/logo.jpg';

const Header: FC = () => {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
    const closeLoginForm = (): void => setShowLoginForm(false);
    const handleShowLoginForm = (): void => setShowLoginForm(true);
    const closeRegistrationForm = (): void => setShowRegistrationForm(false);
    const handleShowRegistrationForm = (): void => setShowRegistrationForm(true);

    return (
        <Navbar expand='lg' className='bg-body-secondary' fixed='top'>
            <Container fluid>
                <Col xs={1} md={1}>
                    <img src={logo} alt="logo" className='rounded-circle' />
                </Col>
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='me-auto my-2 my-lg-0'
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavLink to='cars'>
                            <Button variant='light' className='m-2'>
                                <i className='bi bi-house-door-fill fs-3'></i>
                            </Button>
                        </NavLink>
                        <NavLink to='admin'>
                            <Button variant='light' className='m-2'>
                                <i className='bi bi-gear-fill fs-3'></i>
                            </Button>
                        </NavLink>
                        <Currencies />
                    </Nav>
                    <Button variant='light' className='m-2' onClick={handleShowRegistrationForm}>
                        <i className='bi bi-person-plus-fill fs-3'></i>
                    </Button>
                    <Button variant='light' className='m-2' onClick={handleShowLoginForm}>
                        <i className='bi bi-door-closed-fill fs-3'></i>
                    </Button>
                </Navbar.Collapse>
            </Container>
            <Offcanvas show={showRegistrationForm} onHide={closeRegistrationForm} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Registration</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas show={showLoginForm} onHide={closeLoginForm} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Login</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
    );
}

export {
    Header
}
