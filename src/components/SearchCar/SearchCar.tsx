import { FC } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import { Button, Form } from 'react-bootstrap';

import { carActions } from '../../redux';
import { ISearchCar } from '../../interfaces';
import { useAppDispatch } from '../../hooks';

const SearchCar: FC = () => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, reset } = useForm<ISearchCar>();
    const searchCar: SubmitHandler<ISearchCar> = (data: ISearchCar): void => {
        dispatch(carActions.setSearch(data.search));
        reset();
    };

    return (
        <Form className='d-flex m-2 w-50' onSubmit={handleSubmit(searchCar)}>
            <Form.Control
                type='search'
                placeholder='Search car'
                className='me-2'
                aria-label='Search'
                { ...register('search') }
            />
            <Button type='submit' variant='outline-primary' className='w-50'>Search</Button>
        </Form>
    );
};

export {
    SearchCar
};
