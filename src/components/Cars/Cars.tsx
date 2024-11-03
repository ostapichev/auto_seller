import { FC, Fragment, useEffect, useRef, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

import { carActions } from '../../redux';
import { Car } from '../Car/Car';
import { Cities } from '../Cities/Cities';
import { IFuncVoid } from '../../types';
import { IPagination, IParams } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { SearchCar } from '../SearchCar/SearchCar';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Cars: FC = () => {
    const dispatch = useAppDispatch();
    const {
        cars,
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
    const pageChanger = useCallback((value: string): void => {
        setQuery((prev) => {
            const newPage = value === '&raquo;' || value === ' ...'
                ? totalPages
                : value === '&laquo;' || value === '... '
                    ? 1
                    : value === '&lsaquo;'
                        ? Math.max(+prev.get('page') - 1, 1)
                        : value === '&rsaquo;'
                            ? Math.min(+prev.get('page') + 1, totalPages)
                            : +value;
            return { ...prev, page: newPage.toString() };
        });
    }, [setQuery, totalPages]);
    const dataPagination: IPagination = {
        totalPages,
        page,
        siblings: 1,
        limit,
        pageChanger,
    };
    const changeLimit = useCallback((action: 'increase' | 'decrease'): void => {
            dispatch(action === 'increase' ? carActions.setLimitInc() : carActions.setLimitDec());
            if (page >= totalPages) {
                dispatch(carActions.setPage(totalPages));
            }
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 600);
        }, [dispatch, page, totalPages]);
    const decLimit: IFuncVoid = (): void => {
        dispatch(carActions.setLimitDec());
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    };
    const incLimit: IFuncVoid = (): void => {
        dispatch(carActions.setLimitInc());
        console.log('total pages:', totalPages);
        console.log('page:', page);
        console.log((page >= totalPages - 1));
        if (page >= totalPages) dispatch(carActions.setPage(totalPages));
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    };
    useEffect(() => {
        const queryString: string[] = [];
        queryString.push(`page=${encodeURIComponent(page)}`);
        if (cityId) queryString.push(`city=${encodeURIComponent(cityId)}`);
        if (search) queryString.push(`search=${encodeURIComponent(search)}`);
        if (queryString.length) setQuery(`?${queryString.join('&')}`);
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
                { totalPages > 1 && <PaginationApp dataPagination={ dataPagination } /> }
                <Container>
                    {
                        cars.map((car) => <Car key={ car.id } car={ car } />)
                    }
                </Container>
                <Container className='d-flex justify-content-end' fluid>
                    {
                        limit > showCars &&
                        <Button onClick={ decLimit } className='m-3' variant="primary" size="lg">
                            Hide
                        </Button>
                    }
                    {
                        page !== totalPages &&
                        <Button onClick={ incLimit } className='m-3' variant="primary" size="lg">
                            More
                        </Button>
                    }
                </Container>
                { totalPages > 1 && <PaginationApp dataPagination={ dataPagination } /> }
            </Container>
            <div ref={ bottomRef }></div>
        </Fragment>
    );
};

export {
    Cars
};
