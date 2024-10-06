import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AdminPage, CarsPage, NotFoundPage } from './pages';
import { MainLayout } from './layouts';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout />, children: [
            {
                index: true, element: <Navigate to={'cars'} />
            },
            {
                path: 'cars', element: <CarsPage />
            },
            {
                path: 'admin', element: <AdminPage />
            },
            {
                path: '*', element: <NotFoundPage />
            },
        ]
    }
]);

export default router;
