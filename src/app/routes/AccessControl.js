import Loading from '@common/components/Loading';
import { AUTH } from '@constants';
import { useAuth } from '@services/controller';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { navigatePath } from './config';

function AccessControl({ requireAuth, children }) {
    const { profile, profileLoading } = useAuth();
    const location = useLocation();

    if (profileLoading) {
        return <Loading />;
    }

    if (requireAuth === AUTH.REQUIRE && !profile) {
        return <Navigate to={navigatePath.login} state={{ from: location }} replace />;
    }

    if (requireAuth === AUTH.NOT_REQUIRE && profile) {
        return <Navigate to={navigatePath.home} replace />;
    }

    return children;
}

export default AccessControl;
