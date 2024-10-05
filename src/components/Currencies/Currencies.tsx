import { FC, useEffect } from 'react';

import { Container } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { currencyActions } from '../../redux';
import { Currency } from '../Currency/Currency';

const Currencies: FC = () => {
    const dispatch = useAppDispatch();
    const {currencies, error} = useAppSelector(state => state.currencyReducer);
    useEffect(() => {
        dispatch(currencyActions.getAll());
    }, [dispatch]);
    
    return (
        <Container className='d-flex flex-column justify-content-center align-items-center'>
            {
                currencies.map((currency) => <Currency key={currency.id} currency={currency} />)
            }
            { error?.ccy && <div className="alert alert-danger">{error?.ccy}</div> }
            { error?.base_ccy && <div className="alert alert-danger">{error?.base_ccy}</div> }
            { error?.sale && <div className="alert alert-danger">{error?.sale}</div> }
            { error?.buy && <div className="alert alert-danger">{error?.buy}</div> }
        </Container>
    );
};

export {
    Currencies
};
