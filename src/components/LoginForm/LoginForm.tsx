import {Dispatch, FC, SetStateAction} from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { authActions } from '../../redux';
import { IAuth } from '../../interfaces';
import { getDeviceId } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface IProps {
    showForm: Dispatch<SetStateAction<boolean>>;
}

const LoginForm: FC<IProps> = ({ showForm }) => {
    const dispatch = useAppDispatch();
    const deviceId: string = getDeviceId();
    const { errorAuth } = useAppSelector(state => state.authReducer);
    const { handleSubmit, register, reset, formState: { errors, isValid } } = useForm<IAuth>({

    });
    const signIn: SubmitHandler<IAuth> = async (user: IAuth) => {
        user.deviceId = deviceId;
        const { meta: { requestStatus } } = await dispatch(authActions.signIn(user));
        if (requestStatus === 'fulfilled') showForm(false);
        reset();
    };

    return (
        <Form onSubmit={handleSubmit(signIn)}>
            <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
            >
                <Form.Control
                    type='email'
                    placeholder='name@example.com'
                    {...register('email', { required: true })}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingPassword'
                label='Password'
                className='mb-3'
            >
                <Form.Control
                    type='password'
                    placeholder='Password'
                    {...register('password', { required: true })}
                />
            </FloatingLabel>
            {
                Object.keys(errors).length > 0
                    ?
                    <Alert key='danger' variant='danger'>
                        { Object.values(errors)[0].message }
                    </Alert>
                    :
                    <Button as='input' type='submit' value='Sign in' />
            }
        </Form>
    );
};

export {
    LoginForm
};
