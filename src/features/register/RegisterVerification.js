import React, { useState, useEffect } from 'react';
import './RegisterVerification.css';
import { Card, Image, Text, Button, Input, Group, Grid } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
// const RegisterVerification = () => {
//     const [ otp, setOtp ] = useState('');
//     const [ timeRemaining, setTimeRemaining ] = useState('');
//     const ws = new WebSocket('ws://localhost:8000/ws/otp/');

//     useEffect(() => {
//         ws.onopen = () => {
//             console.log('WebSocket connection established');
//         };

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             console.log(data);
//             setOtp(data.otp);
//             setTimeRemaining(data.timeRemaining);
//         };
//         ws.onclose = function () {
//             console.log('WebSocket connection closed');
//         };

//         return () => {
//             ws.close();
//         };
//     }, [ timeRemaining ]);

//     return (
//         <div className="container">
//             <div className="card">
//                 <h4>Verify OTP</h4>

//                 <input placeholder="Enter OTP" />

//                 <div className="countdown-text">
//                     <p>Time Remaining: 01:25</p>

//                     <button style={{ color: '#FF5630' }}>Resend OTP</button>
//                 </div>

//                 <button className="submit-btn">SUBMIT</button>
//             </div>
//         </div>
//     );
// };

// export default RegisterVerification;

function RegisterVerification() {
    const [ otp, setOtp ] = useState('');
    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds ] = useState(5);
    const location = useLocation();
    const navigate = useNavigate();
    const ws = new WebSocket(`ws://localhost:8000/ws/testotp/${sessionStorage.getItem('tokenRoomOtp')}/`);
    // const ws = new WebSocket(`ws://localhost:8000/ws/otp/`);

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };
        ws.onclose = function () {
            console.log('WebSocket connection closed');
        };
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [ seconds ]);

    const resendOTP = () => {
        setMinutes(0);
        setSeconds(5);
    };

    return (
        <>
            <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: '100' }}>
                <Card.Section pt="md">
                    <Text align={'center'} size="xl" fw={700}>
                        Verification
                    </Text>
                </Card.Section>
                <Card.Section align="center">
                    <Text size="sm" color="dimmed">
                        Code has sent to your email{' '}
                        <Text size="sm" fw={700} fs="italic">
                            admin@gmail.com
                        </Text>
                    </Text>
                </Card.Section>
                <Card.Section align="center" p="xl">
                    <Input
                        size="lg"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={({ target }) => {
                            setOtp(target.value);
                        }}
                    />
                </Card.Section>
                <Card.Section align="center" px="xl">
                    <Grid>
                        <Grid.Col span={7}>
                            {seconds > 0 || minutes > 0 ? (
                                <Text size="sm" align="left">
                                    Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </Text>
                            ) : (
                                <Text size="sm" align="left">
                                    Didn&lsquo;t recieve code?
                                </Text>
                            )}
                        </Grid.Col>
                        <Grid.Col span={5}>
                            <Text
                                size="sm"
                                fw={700}
                                td="underline"
                                align="right"
                                hidden={seconds > 0 || minutes > 0}
                                onClick={resendOTP}
                            >
                                Resend OTP
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Card.Section>
                <Button size="md" fullWidth mt="xl" radius="md">
                    SUBMIT
                </Button>
            </Card>
            {/* <div className="">
                <div className="card">
                    <h4>Verify OTP</h4>

                    <input
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={({ target }) => {
                            setOtp(target.value);
                        }}
                    />

                    <div className="countdown-text">
                        {seconds > 0 || minutes > 0 ? (
                            <p>
                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                        ) : (
                            <p>Did recieve code?</p>
                        )}

                        <button
                            disabled={seconds > 0 || minutes > 0}
                            style={{
                                color: seconds > 0 || minutes > 0 ? '#DFE3E8' : '#FF5630',
                            }}
                            onClick={resendOTP}
                        >
                            Resend OTP
                        </button>
                    </div>

                    <button className="submit-btn">SUBMIT</button>
                </div>
            </div> */}
        </>
    );
}

export default RegisterVerification;
