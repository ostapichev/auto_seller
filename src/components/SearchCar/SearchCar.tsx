import { FC } from 'react';

import { Button, Form } from "react-bootstrap";

const SearchCar: FC = () => {
    return (
        <Form className='d-flex m-2 w-50'>
            <Form.Control
                type='search'
                placeholder='Search car'
                className='me-2'
                aria-label='Search'
            />
            <Button variant='outline-primary' className='w-50'>Search car</Button>
        </Form>
    );
};

export {
    SearchCar
};
