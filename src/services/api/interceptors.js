import { getData } from '@common/utils/localStorage';
import { API_URL, storageKeyAccessToken } from '@constants';
import axios from 'axios';
import refreshToken from './refreshToken';

const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = getData(storageKeyAccessToken);

        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        // if response is unauthorized, try to get new access token and resend request
        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;

            const accessToken = await refreshToken();

            if (!accessToken) {
                return Promise.reject(error);
            }

            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };

            // return instance.request(config);
        }

        return Promise.reject(error);
    },
);

export default instance;
