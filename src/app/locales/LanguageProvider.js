import enMessage from './en.json';
import viMessage from './vi.json';

import { defaultLocale } from '@constants';
import React from 'react';
import { IntlProvider } from 'react-intl';
import useLocale from './useLocale';

const message = {
    en: enMessage,
    vi: viMessage,
};

function LanguageProvider({ children }) {
    const { currentLocale } = useLocale();

    return (
        <IntlProvider
            messages={message[currentLocale]}
            locale={currentLocale}
            defaultLocale={defaultLocale}
        >
            {children}
        </IntlProvider>
    );
}

export default LanguageProvider;
