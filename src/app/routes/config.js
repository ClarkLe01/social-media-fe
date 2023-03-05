import { AUTH } from '@constants';
import { lazy } from 'react';

export const navigatePath = {
    newsFeed: '/',
    login: '/login',
    register: '/register',
    forgetPassword: '/forgot',
    profile: '/profile',
};

const NoAuthLayout = lazy(() => import('@app/layouts/NoAuthLayout'));
const MainLayout = lazy(() => import('@app/layouts/MainLayout'));

const Register = lazy(() => import('@features/register/Register'));
const Login = lazy(() => import('@features/login/Login'));
const ForgetPassword = lazy(() => import('@features/forgotpassword/ForgotPassword'));

const Profile = lazy(() => import('@features/profile/Profile'));
/*
    AUTH.REQUIRE: user must be logged in to access the route
    AUTH.NOT_REQUIRE: user must not be logged in to access the route
    AUTH.BOTH: user can access the route regardless of logged in or not
*/

const routes = [
    {
        name: 'News Feed',
        path: navigatePath.newsFeed,
        element: MainLayout,
        requireAuth: AUTH.NOT_REQUIRE,
        children: [
            {
                name: 'Profile',
                path: navigatePath.profile,
                element: Profile,
            },
        ],
    },


    // SECTION BELOW TO TEST (SHOULD REMOVE)
    // {
    //     name: 'Profile',
    //     path: navigatePath.profile,
    //     element: Profile,
    //     requireAuth: AUTH.NOT_REQUIRE,
    // },

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
