import mem from 'mem';
import { getData, removeItem, setData } from '@common/utils/localStorage';
import { API_URL, storageKeyAccessToken, storageKeyRefreshToken } from '@constants';
import endPoints from './endPoints';
import axios from 'axios';

export const publishInstance = axios.create({
    baseURL: API_URL,
});

async function refreshToken() {
    const token = getData(storageKeyRefreshToken);

    if (!token) {
        return null;
    }

    try {
        const { data } = await publishInstance.request({
            ...endPoints.token.refresh,
            data: {
                refresh: token,
            },
        });

        setData(storageKeyAccessToken, data.access);

        return data.access;
    } catch {
        removeItem(storageKeyAccessToken);
        removeItem(storageKeyRefreshToken);
        return null;
    }
}

// when many requests are get 401, we don't want to call refreshToken many times

const maxAge = 10000;

export default mem(refreshToken, { maxAge });
