// import '@assets/scss/main.scss';

import React, { useState } from 'react';
import ThemeProvider from './theme/ThemeProvider';

import AppRoutes from './routes/AppRoutes';
import AppLoading from './loading';
import { LanguageProvider } from './locales';
import Loading from '@common/components/Loading';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function App() {

    const [ colorScheme, setColorScheme ] = useState('light');

    const toggleColorScheme = () =>
        setColorScheme( (current) => (current === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeProvider>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} >
                    <Notifications />
                    <AppLoading />
                    <LanguageProvider>
                        <React.Suspense fallback={<Loading />}>
                            <AppRoutes />
                        </React.Suspense>
                    </LanguageProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </ThemeProvider>
    );
}

export default App;
