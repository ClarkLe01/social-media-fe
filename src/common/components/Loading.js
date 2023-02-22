import { LoadingOverlay } from '@mantine/core';
import React from 'react';

function Loading({ visible = true, overlayBlur = 4 }) {
    return (
        <LoadingOverlay
            overlayBlur={overlayBlur}
            visible={visible}
            loaderProps={{ variant: 'dots' }}
        />
    );
}

export default Loading;
