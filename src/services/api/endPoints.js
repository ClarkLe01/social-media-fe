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
    },
};
