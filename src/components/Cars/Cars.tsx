import { FC, useEffect } from 'react';

import { Button, Container, Form } from 'react-bootstrap';

import { carActions, cityActions } from '../../redux';
import { Car } from '../Car/Car';
import { City } from '../City/City';
import { IParams } from '../../inteerfaces';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Cars: FC = () => {
    const dispatch = useAppDispatch();
    const { cities, trigger, error } = useAppSelector(state => state.cityReducer);
    const { cars, loading } = useAppSelector(state => state.carReducer);
    useEffect(() => {
        const params: IParams = {limit: 6, page: 1};
        dispatch(carActions.getAll({ params }))
        dispatch(carActions.getBrands());
    }, [dispatch]);
    useEffect(() => {
        dispatch(cityActions.getAll());
    }, [dispatch, trigger]);
    
    return (
        <Container style={{ marginTop: '150px' }}>
            <Container className='d-flex justify-content-between' fluid>
                <Form.Select size='sm' className='w-25 m-2'>
                    <option>All cities</option>
                    {
                        cities.map(city => <City key={ city.id } city={ city } />)
                    }
                    {
                        error && <div className="alert alert-danger">{ error?.name }</div>
                    }
                </Form.Select>
                <Form className='d-flex m-2 w-50'>
                    <Form.Control
                        type='search'
                        placeholder='Search car'
                        className='me-2'
                        aria-label='Search'
                    />
                    <Button variant='outline-primary' className='w-50'>Search</Button>
                </Form>
            </Container>
            <Container>
                {
                    cars.map(car => <Car key={ car.id } car={ car } />)
                }
            </Container>
        </Container>
    );
};

export {
    Cars
};
