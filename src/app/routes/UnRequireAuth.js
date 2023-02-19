import Loading from '@common/components/Loading';
import useAuth from '@features/auth/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { navigatePath } from './config';

function UnRequireAuth({ children }) {
    const { profile, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (profile) {
        return <Navigate to={navigatePath.newsFeed} replace />;
    }

    return children;
}

export default UnRequireAuth;
