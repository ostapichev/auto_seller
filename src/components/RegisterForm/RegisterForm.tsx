import { Dispatch, FC, SetStateAction } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';

import {Alert, FloatingLabel, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { authActions } from '../../redux';
import { authValidator } from '../../validators';
import { getDeviceId } from '../../utils';
import { IAuth } from '../../interfaces';
import { useAppDispatch } from '../../hooks';

interface IProps {
    showForm: Dispatch<SetStateAction<boolean>>;
}

const RegisterForm: FC<IProps> = ({ showForm }) => {
    const dispatch = useAppDispatch();
    const { register, reset, handleSubmit, getValues, formState: { errors, isValid } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
    });
    const registerUser: SubmitHandler<IAuth> = async (user: IAuth) => {
        const deviceId: string = getDeviceId();
        const { confirmPassword, ...userData } = getValues();
        const dataUser: IAuth = { ...userData, deviceId };
        const { meta: { requestStatus } } = await dispatch(authActions.signUp(dataUser));
        if (requestStatus === 'fulfilled') dispatch(authActions.setModalShow());
        showForm(false);
        reset();
    };

    return (
        <Form onSubmit={ handleSubmit(registerUser) }>
            <FloatingLabel
                controlId='floatingName'
                label='name'
                className='mb-3'
            >
                <Form.Control
                    as='textarea'
                    placeholder='enter your name'
                    {...register('name', { required: true })}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingPhone'
                label='phone'
                className='mb-3'
            >
                <Form.Control
                    as='textarea'
                    placeholder='enter your phone'
                    {...register('phone', { required: true })}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingEmail'
                label='email address'
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
                label='enter password'
                className='mb-3'
            >
                <Form.Control
                    type='password'
                    placeholder='enter password'
                    {...register('password', { required: true })}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingConfirmPassword'
                label='enter confirm password'
                className='mb-3'
            >
                <Form.Control
                    type='password'
                    placeholder='confirm password'
                    {...register('confirmPassword', { required: true })}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingSelect'
                label='please choise your gender'
                className='mb-3'
            >
                <Form.Select
                    aria-label='Floating label select example'
                    {...register('gender', { required: true })}
                >
                    <option value='male'>male</option>
                    <option value='female'>female</option>
                </Form.Select>
            </FloatingLabel>
                {
                    Object.keys(errors).length > 0
                        ?
                        <Alert key='danger' variant='danger'>
                            { Object.values(errors)[0].message }
                        </Alert>
                        :
                        <Button disabled={ !isValid } as='input' type='submit' value='Sign up' />
                }
        </Form>
    );
};

export {
    RegisterForm
};
