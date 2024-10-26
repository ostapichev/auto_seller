import { FC } from 'react';

import { Admin, Chat } from '../../components';

const AdminPage: FC = () => {
    return (
        <div>
            <Admin />
            <Chat />
        </div>
    );
};

export {
    AdminPage
};
