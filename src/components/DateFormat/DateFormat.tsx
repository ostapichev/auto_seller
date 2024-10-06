import { FC, Fragment } from 'react';
import { format } from 'date-fns';

interface IProps {
    date: Date;
}

const DateFormat: FC<IProps> = ({ date }) => {
    const formatDate = format(new Date(date), 'MMMM dd, yyyy');

    return (
        <Fragment>
            { formatDate }
        </Fragment>
    );
};

export {
    DateFormat
};
