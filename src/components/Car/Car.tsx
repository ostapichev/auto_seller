import {FC, memo} from 'react';

import { Card, Col, ListGroup, Placeholder, Row } from 'react-bootstrap';

import { CurrencyEnum } from '../../enums';
import { DateFormat } from '../DateFormat/DateFormat';
import { IBrand, ICar, ICity, IModel } from '../../interfaces';
import { useAppSelector } from '../../hooks';

import { empty, uah_icon } from '../../assets';

interface IProps {
    car: ICar;
}

const Car: FC<IProps> = memo(({ car }) => {
    const { cities } = useAppSelector(state => state.cityReducer);
    const { brands, loading } = useAppSelector(state => state.carReducer);
    const { currencies } = useAppSelector(state => state.currencyReducer);
    const {
        id,
        title,
        year,
        brand, 
        model, 
        photo, 
        city,
        update_price, 
        currency,
        created
    } = car;
    const getNameCity = (cityId: string): string => {
        const city: ICity = cities.find(city => city.id === cityId);
        if (city && city.name) {
            return city.name[0].toUpperCase() + city.name.slice(1);
        }
        return 'Error city name';
    };
    const getBrandName = (carBrand: string, modelId: string): string[] => {
        const brand: IBrand = brands.find(brand => brand.id === carBrand);
        if (brand && brand.name) {
            const model: IModel = brand.models.find(model => model.id === modelId);
            return [
                brand.name === ('bmw' || 'kia') 
                    ? brand.name.toUpperCase() 
                    : brand.name[0].toUpperCase() + brand.name.slice(1),
                brand.models ? model.name : null,
            ];
        }
        return ['Error brand name', 'Error model name'];
    };
    const titleFormat: string = title.length > 35 ? `${title.slice(0, 30) + '...'}` : title;
    const cityName: string = getNameCity(city);
    const brandName: string[] = getBrandName(brand, model);
    
    return (
        <Card border='dark' className="w-100 mb-4">
            <Row>
                <Col xs={6}>
                    <Card.Img
                        style={{ width: '620px', height: '400px' }}
                        variant="top"
                        loading="lazy"
                        src={ loading ? empty : photo }
                        alt='car-photo'
                    />
                </Col>
                <Col xs={5}>
                    {
                        loading ?
                        <Card.Body>
                            <Placeholder as={ Card.Title } animation="glow">
                                <Placeholder className='fs-1 mt-2' xs={6} />
                            </Placeholder>
                            <Placeholder as={ Card.Text } animation="glow" className='fs-1'>
                                <Placeholder xs={7} /> <Placeholder xs={4} />
                            </Placeholder>
                                <Placeholder as={ Card.Text } animation="glow" className='fs-4'>
                                    <Placeholder xs={4} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } animation="glow" className='fs-4'>
                                    <Placeholder xs={3} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } animation="glow" className='fs-4'>
                                    <Placeholder xs={7} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } animation="glow" className='fs-2'>
                                    <Placeholder xs={10} />
                                </Placeholder>
                        </Card.Body>
                            :
                        <Card.Body>
                            <Card.Link
                                className='link-offset-2
                                           link-offset-3-hover
                                           link-underline
                                           link-underline-opacity-0
                                           link-underline-opacity-75-hover'
                                    href="#"
                                >
                                    <Card.Title
                                        className='fs-1'
                                        style={{ fontFamily: 'Helvetica' }}
                                    >
                                        { brandName[0] }&nbsp;{ brandName[1] }&nbsp;{ year }
                                    </Card.Title>
                            </Card.Link>
                            <Card.Text className='d-flex align-items-center fs-1'>
                                {
                                    currency === CurrencyEnum.UAH &&
                                    <img style={{ height: '26px' }} src={ uah_icon } alt={ CurrencyEnum.UAH } />
                                }
                                {
                                    currency === CurrencyEnum.USD &&
                                    <i className='bi bi-currency-dollar fs-2'></i>
                                }
                                {
                                    currency === CurrencyEnum.EUR &&
                                    <i className='bi bi-currency-euro fs-2'></i>
                                }
                                &nbsp;{ update_price }&nbsp;
                                {
                                    currency !== CurrencyEnum.UAH &&
                                    <small className="text-muted fs-3">&mdash;&nbsp;
                                        {
                                            currencies.map(value =>
                                                value.ccy === currency && (value.sale * update_price).toFixed(2))
                                        }&nbsp;{ CurrencyEnum.UAH }
                                    </small>
                                }
                            </Card.Text>
                            <Card.Text className='d-flex align-items-center fs-4'>
                                <i className="bi bi-geo-alt-fill"></i>&nbsp;{ cityName }
                            </Card.Text>
                            <Card.Title
                                className='fs-3'
                                style={{ fontFamily: 'Helvetica' }}
                            >
                                { titleFormat }
                            </Card.Title>
                            <Card.Text>
                                    <span className="badge text-bg-secondary fs-5 mb-4">
                                        { <DateFormat date={ created } /> }
                                    </span>
                            </Card.Text>
                            <ListGroup>
                                <ListGroup.Item className='fs-5 text-center w-100'>{ id }</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    }
                </Col>
            </Row>
        </Card>
    );
});

export {
    Car
};
