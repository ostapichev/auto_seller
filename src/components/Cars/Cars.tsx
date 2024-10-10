import { FC, Fragment, useEffect } from 'react';
import {useSearchParams} from "react-router-dom";

import { Button, Container, Form } from 'react-bootstrap';

import { carActions, cityActions } from '../../redux';
import { Car } from '../Car/Car';
import { City } from '../City/City';
import { IPagination, IParams } from '../../inteerfaces';
import { PaginationApp } from "../PaginationApp/PaginationApp";
import { useAppSelector, useAppDispatch } from '../../hooks';

const Cars: FC = () => {
    const dispatch = useAppDispatch();
    const { cities, trigger, error } = useAppSelector(state => state.cityReducer);
    const { cars, loading, total, page, limit } = useAppSelector(state => state.carReducer);
    const [query, setQuery] = useSearchParams();
    const totalPages = Math.ceil(total / limit);
    const pageChanger = (value: string): void => {
        if (value === '&laquo;' || value === '... ') {
            setQuery(prev => ({ ...prev, page: 1 }));
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setQuery(prev => ({ ...prev, page: +prev.get('page') - 1 }));
            }
        } else if (value === '&rsaquo;') {
            setQuery(prev => ({ ...prev, page: +prev.get('page') + 1 }));
        } else if (value === '&raquo;' || value === ' ...') {
            setQuery(prev => ({ ...prev, page: totalPages }));
        } else {
            setQuery(prev => ({ ...prev, page: +value }));
        }
    };
    const dataPagination: IPagination = {
        totalPages,
        page,
        siblings: 1,
        limit,
        pageChanger,
    };
    useEffect(() => {
        const params: IParams = { limit, page: +query.get('page') || 1 };
        dispatch(carActions.getAll({ params }))
    }, [dispatch, limit, page, query]);
    useEffect(() => {
        dispatch(carActions.getBrands());
    }, [dispatch]);
    useEffect(() => {
        dispatch(cityActions.getAll());
    }, [dispatch, trigger]);
    
    return (
        <Fragment>
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
                { !loading && totalPages > 1 && <PaginationApp dataPagination={ dataPagination } /> }
                <Container>
                    { !loading &&
                        cars.map(car => <Car key={ car.id } car={ car } />)
                    }
                </Container>
                { !loading && totalPages > 1 && <PaginationApp dataPagination={ dataPagination } /> }
            </Container>
        </Fragment>
    );
};

export {
    Cars
};
