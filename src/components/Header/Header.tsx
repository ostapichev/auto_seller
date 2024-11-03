import { FC, useState } from 'react';
import { NavLink } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import { Col, Container, Nav, Navbar, OffcanvasBody } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { carActions } from '../../redux'
import { Currencies } from '../Currencies/Currencies';
import { IFuncVoid } from '../../types';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { useAppDispatch } from '../../hooks';

import logo from '../../assets/images/logo.jpg';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
    const [hoverReg, setHoverReg] = useState<boolean>(false);
    const [hoverLogin, setHoverLogin] = useState<boolean>(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
    const closeLoginForm: IFuncVoid = (): void => setShowLoginForm(false);
    const handleShowLoginForm: IFuncVoid = (): void => setShowLoginForm(true);
    const closeRegistrationForm: IFuncVoid = (): void => setShowRegistrationForm(false);
    const handleShowRegistrationForm: IFuncVoid = (): void => setShowRegistrationForm(true);
    const returnHome: IFuncVoid = () => {
        dispatch(carActions.resetParams());
    };

    return (
        <Navbar expand='lg' className='bg-body-secondary' fixed='top'>
            <Container fluid>
                <Col xs={1} md={1}>
                    <img src={ logo } alt="logo" className='rounded-circle' />
                </Col>
                <Navbar.Collapse id='navbarScroll'>
                    <Nav
                        className='me-auto my-2 my-lg-0'
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to='cars'>
                            <Button onClick={ returnHome } variant='light' className='m-2'>
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
                    <Button
                        variant='light'
                        className='m-2'
                        onClick={ handleShowRegistrationForm }
                        onMouseEnter={ () => setHoverReg(true) }
                        onMouseLeave={ () => setHoverReg(false) }
                    >
                        { hoverReg
                            ? <i className="bi bi-person fs-3"></i>
                            : <i className='bi bi-person-plus-fill fs-3'></i>
                        }

                    </Button>
                    <Button
                        variant='light'
                        className='m-2'
                        onClick={handleShowLoginForm}
                        onMouseEnter={ () => setHoverLogin(true) }
                        onMouseLeave={ () => setHoverLogin(false) }
                    >
                        { hoverLogin
                            ? <i className="bi bi-door-open-fill fs-3"></i>
                            : <i className='bi bi-door-closed-fill fs-3'></i>
                        }
                    </Button>
                </Navbar.Collapse>
            </Container>
            <Offcanvas show={ showRegistrationForm } onHide={ closeRegistrationForm } placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Registration</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <RegisterForm />
                </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas show={showLoginForm} onHide={ closeLoginForm } placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Login</Offcanvas.Title>
                </Offcanvas.Header>
                <OffcanvasBody>
                    <LoginForm />
                </OffcanvasBody>
            </Offcanvas>
        </Navbar>
    );
}

export {
    Header
};
