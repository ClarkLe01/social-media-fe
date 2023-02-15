import Register from '@features/register/Register';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@assets/scss/main.scss';

function App() {
    return (
        <Router basename='/'>
            <Routes>
                <Route exact path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
