import { FC } from 'react';

import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const RegisterForm: FC = () => {
    return (
        <Form>
            <FloatingLabel
                controlId='floatingTextarea'
                label='Name'
                className='mb-3'
            >
                <Form.Control as='textarea' placeholder='Enter your name' />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingTextarea'
                label='Phone'
                className='mb-3'
            >
                <Form.Control as='textarea' placeholder='Enter your phone' />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
            >
                <Form.Control type='email' placeholder='name@example.com' />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingPassword'
                label='Enter password'
                className='mb-3'
            >
                <Form.Control type='password' placeholder='Enter password' />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingPassword'
                label='Enter confirm password'
                className='mb-3'
            >
                <Form.Control type='password' placeholder='Confirm password' />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingSelect'
                label='Plese choise your gender'
                className='mb-3'
            >
                <Form.Select aria-label='Floating label select example'>
                    <option value='male'>male</option>
                    <option value='female'>female</option>
                </Form.Select>
            </FloatingLabel>
            <Button as="input" type='submit' value='Sign up' />
        </Form>
    );
};

export {
    RegisterForm
};
