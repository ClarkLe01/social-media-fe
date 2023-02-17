import { LoadingOverlay } from '@mantine/core';
import React from 'react';
import useAppLoading from './useAppLoading';

function AppLoading() {
    const { loading } = useAppLoading();

    return <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ variant: 'dots' }} />;
}

export default AppLoading;
