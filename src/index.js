import App from '@app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { MantineProvider, Button } from '@mantine/core';

Sentry.init({
    dsn: `${process.env.REACT_APP_SENTRY_HOST}`,
    integrations: [ new BrowserTracing() ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

Sentry.captureMessage("this is a debug message", "debug");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MantineProvider theme={{
            fontFamily: '"Montserrat", sans-serif',
        }}>
            <App />
        </MantineProvider>
    </React.StrictMode>,
);
