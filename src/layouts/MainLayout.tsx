import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import {Header, ScrollToTop} from '../components';

const MainLayout: FC = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <ScrollToTop />
        </div>
    );
};

export {
    MainLayout
};
