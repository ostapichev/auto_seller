import { FC } from 'react';

import { ICity } from '../../inteerfaces';

interface  IProps {
    city: ICity;
}

const City: FC<IProps> = ({ city }) => {
    const { id, name } = city;
    const firstLetter = (name: string) => {
        return name[0].toUpperCase() + name.slice(1);
    };
    
    return (
        <option value={ id }>{ firstLetter(name) }</option>
    );
};

export {
    City
};
