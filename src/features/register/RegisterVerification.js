import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const OtpTimer = () => {
    const [ otp, setOtp ] = useState('');
    const [ timeRemaining, setTimeRemaining ] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/otp/');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setOtp(data.otp);
            setTimeRemaining(data.timeRemaining);
        };
        ws.onclose = function() {
            console.log("WebSocket connection closed");
        };

        // return () => {
        //     ws.close();
        // };
    }, [ timeRemaining ]);

    return (
        <>
            <p>OTP: {otp}</p>
            <p>Time remaining: {timeRemaining} seconds</p>
        </>
    );
};

export default OtpTimer;
