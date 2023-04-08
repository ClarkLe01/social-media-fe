import App from '@app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
import store from '@app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@assets/scss/main.scss';

// Sentry.init({
//     dsn: `https://cc963eba32a14664a03504f59b1aa454@o4504649765158912.ingest.sentry.io/4504668852060160`,
//     integrations: [ new BrowserTracing() ],
//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
// });

// Sentry.captureMessage('this is a debug message', 'debug');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
            retry: 1, // default: true
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
);
