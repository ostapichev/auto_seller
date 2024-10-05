import { FC } from 'react';

import { Container } from 'react-bootstrap';

import { CurrencyEnum } from '../../enums';
import { ICurrency } from '../../inteerfaces';

interface IProps {
    currency: ICurrency;
}

const Currency: FC<IProps> = ({ currency }) => {
    const { ccy, buy, sale } = currency;
    const fixedBuy = (Math.round(buy * 100) / 100).toFixed(2);
    const fixedSale = (Math.round(sale * 100) / 100).toFixed(2);
    let currencyIcon: string;
    switch (ccy) {
        case CurrencyEnum.USD:
            currencyIcon = 'bi bi-currency-dollar fs-4';
            break;
        case CurrencyEnum.EUR:
            currencyIcon = 'bi bi-currency-euro fs-4';
            break;    
        default:
            break;
    };

    return (
        <Container className='d-flex align-items-flex-end'>
            <i className={currencyIcon}></i>
            <h4 className='d-flex align-items-center'>
                <span className="badge text-bg-secondary">{fixedBuy}&nbsp;&#8211;&nbsp;{fixedSale}</span>
            </h4>
        </Container>
    );
};

export {
    Currency
};
