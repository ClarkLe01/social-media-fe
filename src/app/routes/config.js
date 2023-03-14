import { AUTH } from '@constants';
import { lazy } from 'react';

export const navigatePath = {
    login: '/login',
    register: '/register',
    forgetPassword: '/forgot',
    profile: '/profile',
    home: '/',
    findpeople: '/people',
    testpage: '/test',
    settings: '/settings',
};

const NoAuthLayout = lazy(() => import('@app/layouts/NoAuthLayout'));
const MainLayout = lazy(() => import('@app/layouts/MainLayout'));

// const NewsFeed = lazy(() => import('@features/news-feed/NewsFeed'));
const Home = lazy(() => import('@features/home/Home'));
const Profile = lazy(() => import('@features/profile/Profile'));
const Settings = lazy(() => import('@features/settings/Settings'));

const Register = lazy(() => import('@features/register/Register'));
const Login = lazy(() => import('@features/login/Login'));
const ForgetPassword = lazy(() => import('@features/forgotpassword/ForgotPassword'));
const FindPeople = lazy(() => import('@features/search/FindPeople'));

const TestPage = lazy(() => import('@features/TestPage/TestPage'));

/*
    AUTH.REQUIRE: user must be logged in to access the route
    AUTH.NOT_REQUIRE: user must not be logged in to access the route
    AUTH.BOTH: user can access the route regardless of logged in or not
*/

const routes = [
    {
        name: 'Auth Layout',
        element: MainLayout,
        requireAuth: AUTH.REQUIRE,
        children: [
            {
                name: 'Home',
                path: navigatePath.home,
                element: Home,
            },
            {
                name: 'Profile',
                path: navigatePath.profile,
                element: Profile,
            },
            {
                name: 'Find People',
                path: navigatePath.findpeople,
                element: FindPeople,
            },
            {
                name: 'Settings',
                path: navigatePath.settings,
                element: Settings,
            },
            {
                name: 'Test Page',
                path: navigatePath.testpage,
                element: TestPage,
            },
        ],
    },
    {
        name: 'No Auth Layout',
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
