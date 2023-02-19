import { generatePath } from 'react-router-dom';
import instance from './interceptors';

function api(
    { url = '', headers = {}, method = '' },
    { data, searchParams = {}, pathParams = {}, signal, rest },
) {
    return instance.request({
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
