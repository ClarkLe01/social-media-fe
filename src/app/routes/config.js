import { AUTH } from '@constants';
import React, { lazy } from 'react';

export const navigatePath = {
    login: '/login',
    register: '/register',
    forgetPassword: '/forgot',
    resetPassword: '/reset/:uid/:token',
    profile: '/profile/:userId',
    about: '/profile/:userId/about',
    profileFriendList: '/profile/:userId/friends',
    photos: '/profile/:userId/photos',
    home: '',
    profilePost: '/profile/:userId',
    findpeople: '/people',
    settings: '/settings',
    helpbox: 'helpbox',
    notification: '/notification',
    chat: '/message/:roomId',
    chatHome: '/message',
    newChat: '/message/new',
    post: '/post/:postId',
    friendRequest: '/friendrequest',
    yourRequest: '/yourrequest',
    friendList: '/friendlist',
    videoCall: '/call/:roomCallId/:roomCallToken',
    notFound404: '/notfound404',
    testpage: '/test',
};

const NoAuthLayout = lazy(() => import('@app/layouts/NoAuthLayout'));
const MainLayout = lazy(() => import('@app/layouts/MainLayout'));
const MessageLayout = lazy(() => import('@app/layouts/MessageLayout'));
const FriendLayout = lazy(() => import('@app/layouts/FriendLayout'));

const Home = lazy(() => import('@features/home/Home'));
const Profile = lazy(() => import('@features/profile/Profile'));
const ProfilePost = lazy(() => import('@features/profile/components/Post'));
const About = lazy(() => import('@features/profile/components/About'));
const ProfileFriendList = lazy(() => import('@features/profile/components/ListFriendProfile'));
const Photos = lazy(() => import('@features/profile/components/Photos'));
const Settings = lazy(() => import('@features/settings/Settings'));
const HelpBox = lazy(() => import('@features/settings/helpbox/HelpBox'));
const Register = lazy(() => import('@features/register/Register'));
const Login = lazy(() => import('@features/login/Login'));
const ForgetPassword = lazy(() => import('@features/forgotpassword/ForgotPassword'));
const ResetPassword = lazy(() => import('@features/forgotpassword/ResetPassword'));
const FindPeople = lazy(() => import('@features/search/FindPeople'));
const Notification = lazy(() => import('@features/notification/Notification'));
const Chat = lazy(() => import('@features/messages/Chat'));
const NewChat = lazy(() => import('@features/messages/NewChat'));
const PostView = lazy(() => import('@features/post/PostView'));
const FriendRequest = lazy(() => import('@features/friend/FriendRequest'));
const FriendList = lazy(() => import('@features/friend/FriendList'));
const YourRequest = lazy(() => import('@features/friend/YourRequest'));

const VideoCall = lazy(() => import('@features/call/VideoCall'));

const NotFound404 = lazy(() => import('@features/errorsPage/NotFound404'));
const TestPage = lazy(() => import('@features/TestPage/TestPage'));

/*
    AUTH.REQUIRE: user must be logged in to access the route
    AUTH.NOT_REQUIRE: user must not be logged in to access the route
    AUTH.BOTH: user can access the route regardless of logged in or not
*/

const routes = [
    {
        name: 'Main Layout',
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
                requireAuth: AUTH.REQUIRE,
                children: [
                    {
                        name: 'About',
                        path: navigatePath.about,
                        element: About,
                    },
                    {
                        name: 'Profile Friend List',
                        path: navigatePath.profileFriendList,
                        element: ProfileFriendList,
                    },
                    {
                        name: 'Profile Post',
                        path: navigatePath.profilePost,
                        element: ProfilePost,
                    },
                    {
                        name: 'Photos',
                        path: navigatePath.photos,
                        element: Photos,
                    },
                ],
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
                name: 'Help box',
                path: navigatePath.helpbox,
                element: HelpBox,
            },
            {
                name: 'Notification',
                path: navigatePath.notification,
                element: Notification,
            },
            {
                name: 'Post Detail View',
                path: navigatePath.post,
                element: PostView,
            },
        ],
    },
    {
        name: 'Chat Layout',
        element: MessageLayout,
        path: '/',
        requireAuth: AUTH.REQUIRE,
        children: [
            {
                name: 'Chat',
                path: navigatePath.chat,
                element: Chat,
            },
            {
                name: 'Home Chat',
                path: navigatePath.chatHome,
                element: Chat,
            },
            {
                name: 'New Room Chat',
                path: navigatePath.newChat,
                element: NewChat,
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
            {
                name: 'ResetPassword',
                path: navigatePath.resetPassword,
                element: ResetPassword,
            },
        ],
    },
    {
        name: 'Test Page',
        path: navigatePath.testpage,
        element: TestPage,
    },
    {
        name: 'Video Call Page',
        path: navigatePath.videoCall,
        element: VideoCall,
    },
    {
        name: 'Error 404 NotFound Layout Page',
        element: NotFound404,
        path: '*',
        requireAuth: AUTH.BOTH,
    },
    
];

export default routes;
