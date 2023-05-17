const headers = {
    json: {
        'Content-Type': 'application/json',
    },
    form: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    multipart: {
        'Content-Type': 'multipart/form-data',
    },
};

export default {
    token: {
        refresh: {
            url: '/token/refresh',
            method: 'POST',
            headers: headers.json,
        },
        verify: {
            url: '/token/verify',
            method: 'POST',
            headers: headers.json,
        },
    },
    user: {
        profile: {
            url: '/user/profile',
            method: 'GET',
            headers: headers.json,
        },
        updateProfile: {
            url: '/user/profile/update',
            method: 'PATCH',
            headers: headers.multipart,
        },
        login: {
            url: '/user/login',
            method: 'POST',
            headers: headers.json,
        },
        register: {
            url: '/user/register',
            method: 'POST',
            headers: headers.json,
        },
        getProfileById: {
            url: '/user/profile/:userId',
            method: 'GET',
            headers: headers.json,
        },
        validatePassword: {
            url: '/user/validate/password',
            method: 'POST',
            headers: headers.json,
        },
    },
    friend: {
        list: {
            url: '/friend/list/:userId',
            method: 'GET',
            headers: headers.json,
        },
        detail: {
            url: '/friend/list/detail/:userId',
            method: 'GET',
            headers: headers.json,
        },
        requests: {
            url: '/friend/requests',
            method: 'GET',
            headers: headers.json,
        },
        responses: {
            url: '/friend/responses',
            method: 'GET',
            headers: headers.json,
        },
        add: {
            url: '/friend/add',
            method: 'POST',
            headers: headers.json,
        },
        acceptRequest: {
            url: '/friend/accept/:instanceId',
            method: 'PATCH',
            headers: headers.json,
        },
        delete: {
            url: '/friend/delete/:instanceId',
            method: 'DELETE',
            headers: headers.json,
        },
    },
    notification: {
        list: {
            url: '/notification',
            method: 'GET',
            headers: headers.json,
        },
        update: {
            url: '/notification/read/:instanceId',
            method: 'PATCH',
            headers: headers.json,
        },
        delete: {
            url: '/notification/delete/:instanceId',
            method: 'DELETE',
            headers: headers.json,
        },
    },
    chat: {
        message: {
            lastest:{
                url: '/chat/message/latest/:roomId',
                method: 'GET',
                headers: headers.json,
            },
            list: {
                url: '/chat/message/list/:roomId',
                method: 'GET',
                headers: headers.json,
            },
            seen: {
                url: '/chat/message/seen/:messageId',
                method: 'GET',
                headers: headers.json,
            },
            send: {
                url: '/chat/message/send',
                method: 'POST',
                headers: headers.multipart,
            },
        },
        room: {
            list: {
                url: '/chat/room/list',
                method: 'GET',
                headers: headers.json,
            },
            create: {
                url: '/chat/room/new',
                method: 'POST',
                headers: headers.multipart,
            },
            detail: {
                url: '/chat/room/detail/:roomId',
                method: 'GET',
                headers: headers.json,
            },
            update: {
                url: '/chat/room/update/:roomId',
                method: 'PATCH',
                headers: headers.multipart,
            },
        },
    },
    post: {
        list: {
            url: '/post/list',
            method: 'GET',
            headers: headers.json,
        },
        userPosts: {
            url: '/post/user/:userId',
            method: 'GET',
            headers: headers.json,
        },
        new: {
            url: '/post/new',
            method: 'POST',
            headers: headers.multipart,
        },
        update: {
            url: '/post/update/:postId',
            method: 'PATCH',
            headers: headers.multipart,
        },
        retrieve: {
            url: '/post/:postId',
            method: 'GET',
            headers: headers.json,
        },
        delete: {
            url: '/post/:postId',
            method: 'DELETE',
            headers: headers.json,
        },
    },
    comment: {
        list: {
            url: '/post/:postId/comments',
            method: 'GET',
            headers: headers.json,
        },
        new: {
            url: '/post/comment/new',
            method: 'POST',
            headers: headers.multipart,
        },
        retrieve: {
            url: '/post/comment/:commentId',
            method: 'GET',
            headers: headers.json,
        },
        update: {
            url: '/post/comment/:commentId',
            method: 'PATCH',
            headers: headers.multipart,
        },
        delete: {
            url: '/post/comment/:commentId',
            method: 'DELETE',
            headers: headers.json,
        },
    },
    interaction: {
        retrieve: {
            url: '/post/:postId/interaction',
            method: 'GET',
            headers: headers.json,
        },
        update: {
            url: '/post/:postId/interaction',
            method: 'PATCH',
            headers: headers.json,
        },
    },
    calling: {
        token: {
            url: '/calling/token',
            method: 'GET',
            headers: headers.json,
        },
        room: {
            new: {
                url: '/calling/room/new',
                method: 'POST',
                headers: headers.json,
            },
            validate: {
                url: '/calling/room/validate',
                method: 'POST',
                headers: headers.json,
            },
        },
    },
};
