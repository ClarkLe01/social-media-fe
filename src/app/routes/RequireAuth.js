import Loading from '@common/components/Loading';
import useAuth from '@features/auth/useAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
    const { profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!profile) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
