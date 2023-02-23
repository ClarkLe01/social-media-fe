import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import theme from './config';

function ThemeProvider({ children }) {
    return (
        <MantineProvider theme={theme}>
            <NotificationsProvider>{children}</NotificationsProvider>
        </MantineProvider>
    );
}

export default ThemeProvider;
