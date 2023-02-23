export const APP_NAME = 'Insane';

export const API_URL = process.env.REACT_APP_API_URL;

export const storageKeyPrefix = 'social-media';
export const storageKeyLocale = `${storageKeyPrefix}-locale`;
export const storageKeyAccessToken = `${storageKeyPrefix}-access-token`;
export const storageKeyRefreshToken = `${storageKeyPrefix}-refresh-token`;

export const defaultLocale = 'en';
export const locales = [ 'en', 'vi' ];

export const AUTH = {
    REQUIRE: true,
    NOT_REQUIRE: false,
    BOTH: null,
};
