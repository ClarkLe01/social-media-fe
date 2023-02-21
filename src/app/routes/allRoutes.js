import React from 'react';
/** Add Route Component */
// Layout Section
const AuthLayout = React.lazy(() => import('../layouts/AuthLayout'));

//Home Section
const Register = React.lazy(() => import('../../features/register/Register'));
const Login = React.lazy(() => import('../../features/login/Login'));
const ForgotPassword = React.lazy(() => import('../../features/forgotpassword/ForgotPassword'));

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
            {
                path: '/forgot',
                element: ForgotPassword,
            },
        ],
    },
];


export { authRoutes };
