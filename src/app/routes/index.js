// import React, { lazy } from 'react';

// const AppLayout = lazy(() => import('@app/layouts/AppLayout'));
// const Register = lazy(() => import('@features/register/Register'));

// const routes = [
//     {
//         path: '/',
//         element: <AppLayout />,
//         children: [
//             {
//                 path: 'register',
//                 element: <Register />,
//             },
//         ],
//     },
// ];

// export default routes;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { authRoutes } from './allRoutes';
import { LoadingOverlay } from '@mantine/core';

const Index = () => {
    return (
        <React.Fragment>
            <Router>
                <Suspense fallback={<LoadingOverlay visible loaderProps={{ variant: 'dots' }} />}>
                    <Routes>
                        {authRoutes.map((route, idx) => (
                            <Route path={route.path} element={<route.element />} key={idx}>
                                {route.childrens.map((childRoute, childIdx) => (
                                    <Route path={childRoute.path} element={<childRoute.element/>} key={childIdx} />
                                ))}
                            </Route>
                        ))}
                    </Routes>
                </Suspense>
            </Router>
        </React.Fragment>
    );
};

export default Index;
