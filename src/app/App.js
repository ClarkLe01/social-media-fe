import '@assets/scss/main.scss';

import React from 'react';

import { LoadingOverlay } from '@mantine/core';
import AppRoute from './routes/AppRoute';
import AppLoading from './loading';

function App() {
    return (
        <React.Suspense fallback={<LoadingOverlay visible loaderProps={{ variant: 'dots' }} />}>
            <AppLoading />
            <AppRoute />
        </React.Suspense>
    );
}

export default App;
