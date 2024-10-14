import { ChangeEvent, FC, Fragment, useEffect, useRef } from 'react';
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

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
    const { cars, loading, total, page, limit, search, cityId } = useAppSelector(state => state.carReducer);
    const [query, setQuery] = useSearchParams();
    const setQueryRef = useRef(setQuery);
    const totalPages = Math.ceil(total / limit);
    const [debounced] = useDebounce<IParams>({
        search: query.get('search'),
        cityId,
        limit,
        page: +query.get('page') || 1,
    }, 500);
    const debouncedString = JSON.stringify(debounced);
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
    const cityChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(carActions.setCity(event.target.value));
    };
    useEffect(() => {
        setQueryRef.current(prev => ({ ...prev, page: page.toString() }));
    }, [page, query]);
    useEffect(() => {
        dispatch(carActions.setPage(+query.get('page')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedString);
        console.log(debouncedString);
        dispatch(carActions.getAll({ params }));
    }, [dispatch, debouncedString, cityId]);
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
                    <Form.Select
                        size='sm'
                        className='w-25 m-2'
                        onChange={ cityChange }
                    >
                        <option value=''>All cities</option>
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
            </Container>
        </Fragment>
    );
};

export {
    Cars
};
