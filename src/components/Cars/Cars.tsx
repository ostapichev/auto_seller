import { FC, Fragment, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

import { carActions } from '../../redux';
import { Car } from '../Car/Car';
import { Cities } from '../Cities/Cities';
import { IFuncVoid } from '../../types';
import { IPagination, IParams } from '../../inteerfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { SearchCar } from '../SearchCar/SearchCar';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Cars: FC = () => {
    const dispatch = useAppDispatch();
    const {
        cars,
        loading,
        total,
        page,
        limit,
        search,
        showCars,
        cityId,
    } = useAppSelector(state => state.carReducer);
    const [query, setQuery] = useSearchParams();
    const totalPages = Math.ceil(total / limit);
    const bottomRef = useRef(null);
    const [debounced] = useDebounce<IParams>({
        search: query.get('search'),
        cityId: query.get('city'),
        page: +query.get('page') || 1,
        limit
    }, 500);
    const debouncedString = JSON.stringify(debounced);
    console.log(debouncedString);
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
    const decLimit: IFuncVoid = (): void => {
        dispatch(carActions.setLimitDec());
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    };
    const incLimit: IFuncVoid = (): void => {
        dispatch(carActions.setLimitInc());
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    };
    useEffect(() => {
        const queryString: string[] = [];
        queryString.push(`page=${encodeURIComponent(page)}`);
        if (cityId) {
            queryString.push(`city=${encodeURIComponent(cityId)}`);
        }
        if (search) {
            queryString.push(`search=${encodeURIComponent(search)}`);
        }
        if (queryString.length) {
            setQuery(`?${queryString.join('&')}`);
        }
    }, [page, setQuery, cityId, search]);
    useEffect(() => {
        dispatch(carActions.setPage(+query.get('page')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedString);
        dispatch(carActions.getAll({ params }));
    }, [dispatch, debouncedString]);
    useEffect(() => {
        dispatch(carActions.getBrands());
    }, [dispatch]);
    
    return (
        <Fragment>
            <Container style={{ marginTop: '150px' }}>
                <Container className='d-flex justify-content-between' fluid>
                    <Cities/>
                    <SearchCar/>
                </Container>
                {
                    !loading && totalPages > 1 && <PaginationApp dataPagination={ dataPagination } />
                }
                <Container>
                    {
                        !loading && cars.map(car => <Car key={ car.id } car={ car }/>)
                    }
                </Container>
                <Container className='d-flex justify-content-end' fluid>
                    {
                        limit > showCars &&
                        <Button onClick={ decLimit } className='m-3' variant="primary" size="lg">Hide</Button>
                    }
                    {
                        limit < total - showCars &&
                        <Button onClick={ incLimit } className='m-3' variant="primary" size="lg">More</Button>
                    }
                </Container>
            </Container>
            <div ref={ bottomRef }></div>
        </Fragment>
    );
};

export {
    Cars
};
