import { AUTH } from '@constants';
import { lazy } from 'react';

export const navigatePath = {
    newsFeed: '/',
    login: '/login',
    register: '/register',
    forgetPassword: '/forgot',
};

const NewsFeed = lazy(() => import('@features/news-feed/NewsFeed'));
const NoAuthLayout = lazy(() => import('@app/layouts/NoAuthLayout'));
// const MainLayout = lazy(() => import('../layouts/MainLayout'));
const Register = lazy(() => import('@features/register/Register'));
const Login = lazy(() => import('@features/login/Login'));
const ForgetPassword = lazy(() => import('@features/forgotpassword/ForgotPassword'));

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
        name: 'Auth Layout',
        element: NoAuthLayout,
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
            {
                name: 'ForgetPassword',
                path: navigatePath.forgetPassword,
                element: ForgetPassword,
            },
        ],
    },
];

export default routes;
