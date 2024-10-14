import { FC, Fragment, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { carActions } from '../../redux';
import { Car } from '../Car/Car';
import { Cities } from '../Cities/Cities';
import { IPagination, IParams } from '../../inteerfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { SearchCar } from '../SearchCar/SearchCar';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Cars: FC = () => {
    const dispatch = useAppDispatch();
    const { cars, loading, total, page, limit, cityId } = useAppSelector(state => state.carReducer);
    const [query, setQuery] = useSearchParams();
    const totalPages = Math.ceil(total / limit);
    const [debounced] = useDebounce<IParams>({
        search: query.get('search'),
        cityId: query.get('city'),
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
    useEffect(() => {
        const queryString: string[] = [];
        queryString.push(`page=${encodeURIComponent(page)}`);
        if (cityId) {
            queryString.push(`city=${encodeURIComponent(cityId)}`);
        }
        if (queryString.length) {
            setQuery(`?${queryString.join('&')}`);
        }
    }, [page, setQuery, cityId]);
    useEffect(() => {
        dispatch(carActions.setPage(+query.get('page')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedString);
        console.log(debouncedString);
        dispatch(carActions.getAll({ params }));
    }, [dispatch, debouncedString]);
    useEffect(() => {
        dispatch(carActions.getBrands());
    }, [dispatch]);
    
    return (
        <Fragment>
            <Container style={{ marginTop: '150px' }}>
                <Container className='d-flex justify-content-between' fluid>
                    <Cities />
                    <SearchCar />
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
