import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import theme from './config';

function ThemeProvider({ children }) {
    return (
        <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
            <Notifications />
            {children}
        </MantineProvider>
    );
}

export default ThemeProvider;
