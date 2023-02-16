import axios from 'axios';

const UnAuthenticatedCallApi = axios.create({
    baseURL: `${process.env.REACT_APP_HOST_API}`,
    headers: {
        "Content-type": "application/json",
    },
});

export default UnAuthenticatedCallApi;