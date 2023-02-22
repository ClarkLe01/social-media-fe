import { generatePath } from 'react-router-dom';
import privateInstance from './interceptors';
import { publishInstance } from './refreshToken';

function api({ url, headers, method } = {}, { data, searchParams, pathParams, signal, rest } = {}) {
    return privateInstance.request({
        url: generatePath(url, pathParams),
        headers,
        method,
        data,
        params: searchParams,
        signal,
        ...rest,
    });
}

export function publicApi(
    { url, headers, method } = {},
    { data, searchParams, pathParams, signal, rest } = {},
) {
    return publishInstance.request({
        url: generatePath(url, pathParams),
        headers,
        method,
        data,
        params: searchParams,
        signal,
        ...rest,
    });
}

export { default as endPoints } from './endPoints';

export default api;
