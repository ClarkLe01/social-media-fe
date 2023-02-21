import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLocale, selectLocales } from './localeSlice';

function useLocale() {
    const dispatch = useDispatch();
    const currentLocale = useSelector(selectCurrentLocale);
    const locales = useSelector(selectLocales);

    function changeCurrentLocale(locale) {
        dispatch(changeCurrentLocale(locale));
    }

    return { currentLocale, locales, changeCurrentLocale };
}

export default useLocale;
