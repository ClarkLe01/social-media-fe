import React, { useState } from 'react';
import ThemeProvider from './theme/ThemeProvider';

import AppRoutes from './routes/AppRoutes';
import AppLoading from './loading';
import { LanguageProvider } from './locales';
import Loading from '@common/components/Loading';
import { ColorSchemeProvider, MantineProvider, useMantineColorScheme } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';

function App() {
    const [ colorScheme, setColorScheme ] = useState('light');


    const toggleColorScheme = () =>
        setColorScheme( (current) => (current === 'dark' ? 'light' : 'dark'));

    //useHotkeys( [ [ 'mod+J', () => toggleColorScheme() ] ] );

    return (
        <ThemeProvider>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={ { colorScheme } } >
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