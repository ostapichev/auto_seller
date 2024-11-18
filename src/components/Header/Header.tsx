import { FC, Fragment, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { Badge, Card, Col, Container, Nav, Navbar, OffcanvasBody, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { authActions, carActions } from '../../redux'
import { authService } from '../../services';
import { Currencies } from '../Currencies/Currencies';
import { GenderEnum, UserRoleEnum } from '../../enums';
import { IFuncVoid } from '../../types';
import { LoginForm } from '../LoginForm/LoginForm';
import { ModalsApp } from '../ModalsApp/ModalsApp';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { female_avatar, male_avatar } from '../../assets';
import logo from '../../assets/images/logo.jpg';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { me } = useAppSelector(state => state.authReducer);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
    const [hoverReg, setHoverReg] = useState<boolean>(false);
    const [hoverLogin, setHoverLogin] = useState<boolean>(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
    const isStaff: boolean = me?.role === (UserRoleEnum.SUPERUSER || UserRoleEnum.ADMIN);
    const closeLoginForm: IFuncVoid = (): void => setShowLoginForm(false);
    const handleShowLoginForm: IFuncVoid = (): void => setShowLoginForm(true);
    const closeRegistrationForm: IFuncVoid = (): void => setShowRegistrationForm(false);
    const handleShowRegistrationForm: IFuncVoid = (): void => setShowRegistrationForm(true);
    const logout: IFuncVoid = () => {
        dispatch(authActions.signOut());
        dispatch(authActions.logout());
        dispatch(carActions.resetParams());
        navigate('/cars');
    };
    const returnHome: IFuncVoid = () => {
        dispatch(carActions.resetParams());
    };
    useEffect(() => {
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me());
        }
    }, [dispatch, me]);

    return (
        <Navbar expand='lg' className='bg-body-secondary' fixed='top'>
            <Container fluid>
                <Col xs={1} md={1}>
                    <Image src={ logo } alt='logo' roundedCircle />
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
                        {
                            isStaff &&
                            <NavLink to='admin'>
                                <Button variant='light' className='m-2'>
                                    <i className='bi bi-gear-fill fs-3'></i>
                                </Button>
                            </NavLink>
                        }
                        <Currencies />
                    </Nav>
                    { !me ?
                        <Fragment>
                            <Button
                                variant='light'
                                className='m-2'
                                onClick={ handleShowRegistrationForm }
                                onMouseEnter={ () => setHoverReg(true) }
                                onMouseLeave={ () => setHoverReg(false) }
                            >
                                {
                                    hoverReg
                                        ? <i className='bi bi-person fs-3'></i>
                                        : <i className='bi bi-person-plus-fill fs-3'></i>
                                }

                            </Button>
                            <Button
                                variant='light'
                                className='m-2'
                                onClick={ handleShowLoginForm }
                                onMouseEnter={ () => setHoverLogin(true) }
                                onMouseLeave={ () => setHoverLogin(false) }
                            >
                                {
                                    hoverLogin
                                        ? <i className='bi bi-door-open-fill fs-3'></i>
                                        : <i className='bi bi-door-closed-fill fs-3'></i>
                                }
                            </Button>
                        </Fragment>
                        :
                        <Fragment>
                            <Card style={{ width: '300px', height: '100px', borderRadius: '50px' }}>
                                <Row>
                                    <Col xs={4}>
                                        <Card.Img
                                            style={{ width: '100px' }}
                                            variant='top'
                                            src={ me.image || (me.gender === GenderEnum.MALE ? male_avatar : female_avatar) }
                                            alt='avater'
                                        />
                                    </Col>
                                    <Col xs={7}>
                                        <Card.Body>
                                            <Card.Title>{ me.name }</Card.Title>
                                            <Col xs={6}>
                                                <Badge bg='danger'>{ me.account }</Badge>
                                                <Badge bg='success' className='mb-2'>{ me.role }</Badge>
                                            </Col>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                            <Button
                                variant='light'
                                className='m-2'
                                onClick={ logout }
                                onMouseEnter={ () => setHoverLogin(true) }
                                onMouseLeave={ () => setHoverLogin(false) }
                            >
                                {
                                    hoverLogin
                                        ? <i className='bi bi-door-closed-fill fs-3'></i>
                                        : <i className='bi bi-door-open-fill fs-3'></i>
                                }
                            </Button>
                        </Fragment>
                    }
                </Navbar.Collapse>
            </Container>
            <Offcanvas show={ showRegistrationForm } onHide={ closeRegistrationForm } placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Registration</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <RegisterForm showForm={ setShowRegistrationForm } />
                </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas show={ showLoginForm } onHide={ closeLoginForm } placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Login</Offcanvas.Title>
                </Offcanvas.Header>
                <OffcanvasBody>
                    <LoginForm showForm={ setShowLoginForm } />
                </OffcanvasBody>
            </Offcanvas>
            <ModalsApp />
        </Navbar>
    );
}

export {
    Header
};
