import { Dispatch, FC, SetStateAction } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Alert, FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { authActions } from '../../redux';
import { IAuth } from '../../interfaces';
import { getDeviceId } from '../../utils';
import { loginValidator } from '../../validators';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface IProps {
    showForm: Dispatch<SetStateAction<boolean>>;
}

const LoginForm: FC<IProps> = ({ showForm }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const deviceId: string = getDeviceId();
    const { errorAuth, loading } = useAppSelector(state => state.authReducer);
    const { handleSubmit, register, reset, getValues, formState: { errors, isValid } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(loginValidator)
    });
    const signIn: SubmitHandler<IAuth> = async (user: IAuth) => {
        user.deviceId = deviceId;
        const { meta: { requestStatus } } = await dispatch(authActions.signIn(user));
        const { email } = getValues();
        if (requestStatus === 'fulfilled') {
            showForm(false);
            navigate(`/${email}`);
        }
        reset();
    };

    return (
        <Form onSubmit={ handleSubmit(signIn) }>
            <FloatingLabel
                controlId='floatingInput'
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
                label='password'
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
                    ? <Alert key='danger' variant='danger'>{ Object.values(errors)[0].message }</Alert>
                    : <Button disabled={ !isValid || loading } as='input' type='submit' value='Sign in' />
            }
            {
                errorAuth?.messages &&
                    <Alert key='danger' variant='danger' className='mt-3'>
                        { errorAuth.messages }
                    </Alert>
            }
        </Form>
    );
};

export {
    LoginForm
};
