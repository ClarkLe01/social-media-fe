import React, { lazy } from 'react';

const AppLayout = lazy(() => import('@app/layouts/AppLayout'));
const Register = lazy(() => import('@features/register/Register'));

const routes = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
];

export default routes;
