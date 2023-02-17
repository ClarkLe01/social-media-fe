// import '@assets/scss/main.scss';

// import React from 'react';

// import { LoadingOverlay } from '@mantine/core';
// import AppRoutes from './routes/AppRoutes';
// import AppLoading from './loading';

// function App() {
//     return (
//         <React.Suspense fallback={<LoadingOverlay visible loaderProps={{ variant: 'dots' }} />}>
//             <AppLoading />
//             <AppRoutes />
//         </React.Suspense>
//     );
// }

// export default App;

import React from 'react';
import '@assets/scss/main.scss';
import Routes from "./routes";

function App() {
    return (
        <React.Fragment>
            <Routes />
        </React.Fragment>
    );
}

export default App;
