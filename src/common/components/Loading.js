import { LoadingOverlay } from '@mantine/core';
import React from 'react';

function Loading({ visible = true, overlayBlur = 0 }) {
    return (
        <LoadingOverlay
            overlayBlur={overlayBlur}
            visible={visible}
            loaderProps={{ variant: 'dots' }}
        />
    );
}

export default Loading;
