import { FC } from 'react';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';

import { CurrencyEnum } from '../../enums';
import { DateFormat } from '../DateFormat/DateFormat';
import { IBrand, ICar, ICity, IModel } from '../../inteerfaces';
import { useAppSelector } from "../../hooks";

import { empty, uah_icon } from '../../assets';

interface IProps {
    car: ICar;
}

const Car: FC<IProps> = ({ car }) => {
    const { cities } = useAppSelector(state => state.cityReducer);
    const { brands } = useAppSelector(state => state.carReducer);
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
    const cityName = getNameCity(city);
    const brandName = getBrandName(brand, model);
    
    return (
        <Card border='dark' className="w-100 mt-4">
            <Row>
                <Col xs={6}>
                    <Card.Img
                        style={{ width: '620px', height: '400px' }}
                        variant="top"
                        src={ photo || empty }
                        alt='car-photo'
                    />
                </Col>
                <Col xs={5}>
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
                            &nbsp;{ update_price }
                        </Card.Text>
                        <Card.Text className='d-flex align-items-center fs-4'>
                            <i className="bi bi-geo-alt-fill"></i>
                            &nbsp;{ cityName }
                        </Card.Text>
                        <Card.Title
                            className='fs-3'
                            style={{ fontFamily: 'Helvetica' }}
                        >
                            { title }
                        </Card.Title>
                        <Card.Text>
                            <span className="badge text-bg-secondary fs-5 mb-4">{ <DateFormat date={ created } /> }</span>
                        </Card.Text>
                    </Card.Body>
                    <ListGroup>
                        <ListGroup.Item className='fs-5 text-center w-100'>{ id }</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Card>
    );
};

export {
    Car
};
