import logo from '../logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';

function App() {
    const [ data, setData ] = useState(null);
    const host = process.env.HOST_API;
    useEffect(() => {
        fetch(`${host}/test/`)
            .then((res) => res.json())
            .then((data) => setData(data.data));
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>An Awesome Blog </h1>
                <h3>On Django, React, Postgres, and Docker </h3>

                <p>{data}</p>
            </header>
        </div>
    );
}

export default App;


