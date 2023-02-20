import { AUTH } from '@constants';
import React, { lazy } from 'react';

export const navigatePath = {
    newsFeed: '/',
    login: '/login',
    register: '/register',
};

const NewsFeed = lazy(() => import('@features/news-feed/NewsFeed'));
const AppLayout = lazy(() => import('@app/layouts/AppLayout'));
const Register = lazy(() => import('@features/register/Register'));
const Login = lazy(() => import('@features/login/Login'));

/*
    AUTH.REQUIRE: user must be logged in to access the route
    AUTH.NOT_REQUIRE: user must not be logged in to access the route
    AUTH.BOTH: user can access the route regardless of logged in or not
*/

const routes = [
    {
        name: 'News Feed',
        path: navigatePath.newsFeed,
        element: NewsFeed,
        requireAuth: AUTH.REQUIRE,
    },

    {
        name: 'App Layout',
        element: AppLayout,
        requireAuth: AUTH.NOT_REQUIRE,
        children: [
            {
                name: 'Register',
                path: navigatePath.register,
                element: Register,
            },
            {
                name: 'Login',
                path: navigatePath.login,
                element: Login,
            },
        ],
    },
];

export default routes;
