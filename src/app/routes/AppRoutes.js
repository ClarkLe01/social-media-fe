import { AUTH } from '@constants';
import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccessControl from './AccessControl';
import routes from './config';
import RequireAuth from './RequireAuth';
import UnRequireAuth from './UnRequireAuth';

function createRoute(routes) {
    const route = routes.map((route, index) => (
        <Route
            key={index}
            path={route.path}
            element={
                <AccessControl requireAuth={route.requireAuth}>
                    <route.element />
                </AccessControl>
                // route.requireAuth ? (
                //     <RequireAuth>
                //         <route.element />
                //     </RequireAuth>
                // ) : (
                //     <route.element />
                // )
            }
            {...route.props}
        >
            {route.children && createRoute(route.children)}
        </Route>
    ));

    return route;
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>{createRoute(routes)}</Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
