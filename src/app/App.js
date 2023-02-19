import '@assets/scss/main.scss';

import React from 'react';
import ThemeProvider from './theme/ThemeProvider';

import AppRoutes from './routes/AppRoutes';
import AppLoading from './loading';
import { LanguageProvider } from './locales';
import Loading from '@common/components/Loading';

function App() {
    return (
        <ThemeProvider>
            <AppLoading />
            <LanguageProvider>
                <React.Suspense fallback={<Loading />}>
                    <AppRoutes />
                </React.Suspense>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
