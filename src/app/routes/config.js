import { AUTH } from '@constants';
import { lazy } from 'react';

export const navigatePath = {
    login: '/login',
    register: '/register',
    forgetPassword: '/forgot',
    profile: '/:userId',
    home: '/',
    findpeople: '/people',
    settings: '/settings',
    notification: '/notification',
    chat: ':roomId',
    media: '/media',
    friendRequest: '/friendrequest',
    yourRequest: '/yourrequest',
    friendList: '/friendlist',
    testpage: '/test',
};

const NoAuthLayout = lazy(() => import('@app/layouts/NoAuthLayout'));
const MainLayout = lazy(() => import('@app/layouts/MainLayout'));
const NoSideBarLayout = lazy(() => import('@app/layouts/NoSideBarLayout'));
const MessageLayout = lazy(() => import('@app/layouts/MessageLayout'));
const FriendLayout = lazy(() => import('@app/layouts/FriendLayout'));

const Home = lazy(() => import('@features/home/Home'));
const Profile = lazy(() => import('@features/profile/Profile'));
const Settings = lazy(() => import('@features/settings/Settings'));

const Register = lazy(() => import('@features/register/Register'));
const Login = lazy(() => import('@features/login/Login'));
const ForgetPassword = lazy(() => import('@features/forgotpassword/ForgotPassword'));
const FindPeople = lazy(() => import('@features/search/FindPeople'));
const Notification = lazy(() => import('@features/notification/Notification'));
const Chat = lazy(() => import('@features/messages/Chat'));
const PostView = lazy(() => import('@features/post/PostView'));
const FriendRequest = lazy(() => import('@features/friend/FriendRequest'));
const FriendList = lazy(() => import('@features/friend/FriendList'));
const YourRequest = lazy(() => import('@features/friend/YourRequest'));


const TestPage = lazy(() => import('@features/TestPage/TestPage'));

/*
    AUTH.REQUIRE: user must be logged in to access the route
    AUTH.NOT_REQUIRE: user must not be logged in to access the route
    AUTH.BOTH: user can access the route regardless of logged in or not
*/

const routes = [
    {
        name: 'First Layout',
        element: MainLayout,
        path: '/',
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
        name: 'Second Layout',
        element: NoSideBarLayout,
        path: '/',
        requireAuth: AUTH.REQUIRE,
        children: [
            {
                name: 'Notification',
                path: navigatePath.notification,
                element: Notification,
            },
            {
                name: 'Post View',
                path: navigatePath.media,
                element: PostView,
            },
        ],
    },
    {
        name: 'Chat Layout',
        element: MessageLayout,
        path: 'message',
        requireAuth: AUTH.REQUIRE,
        children: [
            {
                name: 'Chat',
                path: navigatePath.chat,
                element: Chat,
            },
            {
                name: 'Home Chat',
                path: '',
                element: Chat,
            },
        ],
    },
    {
        name: 'Friend Layout',
        element: FriendLayout,
        path: '/',
        requireAuth: AUTH.REQUIRE,
        children: [
            {
                name: 'Friend Request',
                path: navigatePath.friendRequest,
                element: FriendRequest,
            },
            {
                name: 'Friend List',
                path: navigatePath.friendList,
                element: FriendList,
            },
            {
                name: 'Your Request',
                path: navigatePath.yourRequest,
                element: YourRequest,
            },
        ],
    },
    {
        name: 'No Auth Layout',
        element: NoAuthLayout,
        path: '/',
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
