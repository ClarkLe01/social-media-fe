import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading, setAppLoading } from './appLoadingSlice';

function useAppLoading() {
    const dispatch = useDispatch();
    const loading = useSelector(selectAppLoading);

    function setLoading(loading) {
        dispatch(setAppLoading(loading));
    }

    return { loading, setLoading };
}

export default useAppLoading;
