import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccessControl from './AccessControl';
import routes from './config';

function createRoute(routes) {
    const route = routes.map((route) => (
        <Route
            key={route.name}
            path={route.path}
            element={
                <AccessControl requireAuth={route.requireAuth}>
                    <route.element />
                </AccessControl>
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
            <Routes>
                {createRoute(routes)}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
