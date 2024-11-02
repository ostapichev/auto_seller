import { ChangeEvent, FC, useEffect } from 'react';

import { Form } from 'react-bootstrap';

import { City } from '../City/City';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { carActions, cityActions } from '../../redux';

const Cities: FC = () => {
    const dispatch = useAppDispatch();
    const { cities, trigger, error } = useAppSelector(state => state.cityReducer);
    const cityChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        dispatch(carActions.setCity(event.target.value));
    };
    useEffect(() => {
        dispatch(cityActions.getAll());
    }, [dispatch, trigger]);

    return (
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
                error && <div className='alert alert-danger'>{ error?.name }</div>
            }
        </Form.Select>
    );
};

export {
    Cities
};
