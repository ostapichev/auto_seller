import { FC, Fragment } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { authActions } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';

const ModalsApp: FC = () => {
    const dispatch = useAppDispatch();
    const { showModal, errorAuth } = useAppSelector(state => state.authReducer);
    const handleClose = () => dispatch(authActions.setModalHide());

    return (
        <Fragment>
            <Modal
                show={ !!showModal || !!errorAuth }
                onHide={ handleClose }
                backdrop='static'
                keyboard={ false }
            >
                <Modal.Header closeButton>
                    <Modal.Title>{ showModal ? 'SUCCESS' : 'ERROR' }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ showModal ? 'Registration successful! Check your email!' : errorAuth?.messages }</Modal.Body>
                <Modal.Footer>
                    <Button onClick={ handleClose } variant='primary'>Understood</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export {
    ModalsApp
};
