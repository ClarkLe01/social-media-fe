import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '.';

function createDeepRoute(routes) {
    const deepRoute = routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} {...route.props}>
            {route.children && createDeepRoute(route.children)}
        </Route>
    ));

    return deepRoute;
}

function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>{createDeepRoute(routes)}</Routes>
        </BrowserRouter>
    );
}

export default AppRoute;
