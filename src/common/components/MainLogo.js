import React from 'react';
import { Link } from 'react-router-dom';
import { MediaQuery } from '@mantine/core';

function MainLogo() {
    return (
        <>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Link to="/">
                    <i className="feather-zap text-success display1-size me-2 ms-0"></i>
                    <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                        Insane{' '}
                    </span>{' '}
                </Link>
            </MediaQuery>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <i className="feather-zap text-success display1-size me-2 ms-0"></i>
            </MediaQuery>
        </>
    );
}
export default MainLogo;