import { FC } from 'react';

import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const LoginForm: FC = () => {
    return (
        <Form>
            <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
            >
                <Form.Control type='email' placeholder='name@example.com' />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingPassword'
                label='Password'
                className='mb-3'
            >
                <Form.Control type='password' placeholder='Password' />
            </FloatingLabel>
            <Button as='input' type='submit' value='Sign in' />
        </Form>
    );
};

export {
    LoginForm
};
