import { generatePath } from 'react-router-dom';
import { getData } from '@common/utils/localStorage';
import { SOCKET_URL, storageKeyAccessToken } from '@constants';

export default class Socket{
    constructor({ url } = {}, { pathParams } = {}){
        this.url = url;
        this.pathParams = pathParams;
    }
    public(){
        return new WebSocket(`${SOCKET_URL}${generatePath(this.url, this.pathParams)}`);
    }
    private(){
        const accessToken = getData(storageKeyAccessToken);
        return new WebSocket(`${SOCKET_URL}${generatePath(this.url, this.pathParams)}?token=${accessToken}`);
    }
}

export { default as connections } from './connections';