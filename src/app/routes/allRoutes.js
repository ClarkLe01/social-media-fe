import React from 'react';
/** Add Route Component */
// Layout Section
const AuthLayout = React.lazy(() => import('../layouts/AuthLayout'));
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));

//Home Section
const Register = React.lazy(() => import('../../features/register/Register'));
const Login = React.lazy(() => import('../../features/login/Login'));

const authRoutes = [
    {
        path: '/',
        element: AuthLayout,
        childrens: [
            {
                path: '/register',
                element: Register,
            },
            {
                path: '/login',
                element: Login,
            },
        ],
    },
    {
        path: '/',
        element: MainLayout,
        childrens: [
            {
                path: '/home',
                element: Register,
            },
            {
                path: '/profile',
                element: Login,
            },
        ],
    },
];


export { authRoutes };
