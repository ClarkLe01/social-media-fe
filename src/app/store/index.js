import { configureStore } from '@reduxjs/toolkit';
import { appLoadingReduder } from '@app/loading';
import { localeReducer } from '@app/locales';

export default configureStore({
    reducer: {
        appLoading: appLoadingReduder,
        locale: localeReducer,
    },
});
