const { setData, getData } = require('@common/utils/localStorage');
const { locales, storageKeyLocale, defaultLocale } = require('@constants');
const { createSlice } = require('@reduxjs/toolkit');

function getCurrentLocale() {
    const locale = getData(storageKeyLocale);

    if (locale && locales.includes(locale)) {
        return locale;
    }

    setData(storageKeyLocale, defaultLocale);

    return defaultLocale;
}

const initialState = {
    locales: locales,
    currentLocale: getCurrentLocale(),
};

const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        changeCurrentLocale(state, action) {
            if (!state.locales.includes(action.payload)) {
                return;
            }
            state.currentLocale = action.payload;
            setData(storageKeyLocale, action.payload);
        },
    },
});

export const { changeCurrentLocale } = localeSlice.actions;

export const selectLocales = (state) => state.locale.locales;
export const selectCurrentLocale = (state) => state.locale.currentLocale;

export default localeSlice.reducer;
