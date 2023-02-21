import { LoadingOverlay } from '@mantine/core';
import React from 'react';
import useAppLoading from './useAppLoading';

function AppLoading({ overlayBlur = 2 }) {
    const { loading } = useAppLoading();

    return (
        <LoadingOverlay
            visible={loading}
            overlayBlur={overlayBlur}
            loaderProps={{ variant: 'dots' }}
        />
    );
}

export default AppLoading;
