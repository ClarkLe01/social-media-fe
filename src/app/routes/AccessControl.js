import Loading from '@common/components/Loading';
import { removeItem } from '@common/utils/localStorage';
import { AUTH, storageKeyAccessToken, storageKeyRefreshToken } from '@constants';
import { useAuth } from '@features/auth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { navigatePath } from './config';

function AccessControl({ requireAuth, children }) {
    const { profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (requireAuth === AUTH.REQUIRE && !profile) {
        removeItem(storageKeyAccessToken);
        removeItem(storageKeyRefreshToken);

        return <Navigate to={navigatePath.login} state={{ from: location }} replace />;
    }

    if (requireAuth === AUTH.NOT_REQUIRE && profile) {
        return <Navigate to={navigatePath.newsFeed} replace />;
    }

    return children;
}

export default AccessControl;
