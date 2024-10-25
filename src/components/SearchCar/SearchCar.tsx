import { FC, FormEvent } from 'react';

import { Button, Form } from "react-bootstrap";

import { carActions } from "../../redux";
import { useAppDispatch } from "../../hooks";

const SearchCar: FC = () => {
    const dispatch = useAppDispatch();
    const searchCar = (data: FormEvent<HTMLFormElement>): void => {
        dispatch(carActions.setSearch(data));
    };

    return (
        <Form className='d-flex m-2 w-50' onSubmit={searchCar}>
            <Form.Control
                type='search'
                placeholder='Search car'
                className='me-2'
                aria-label='Search'
            />
            <Button type='submit' variant='outline-primary' className='w-50'>Search</Button>
        </Form>
    );
};

export {
    SearchCar
};
