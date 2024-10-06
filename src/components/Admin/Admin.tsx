import { FC } from 'react';

import { Button, Container, Form } from 'react-bootstrap';

const Admin: FC = () => {
    return (
        <Container className='d-flex justify-content-center' style={{ marginTop: '150px' }} fluid>
            <Form className='d-flex m-2 w-50'>
                <Form.Control
                    type='search'
                    placeholder='Search user'
                    className='me-2'
                    aria-label='Search'
                />
                <Button variant='outline-primary' className='w-50'>Search</Button>
            </Form>
        </Container>
    );
};

export {
    Admin
};
