import { Image, Text } from '@mantine/core';
import React from 'react';
export function EndCallScreen() {
    
    return (
        <div
            className='d-flex justify-content-evenly align-items-center px-3'
            style={{
                background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div className='pe-3'>
                <Text fw={700} color='white' size={30}>
                    The call is ended!
                </Text>
                <Text color='white' size={15}>
                    Enjoy reduced background noise and reliable connections on Insane for Windows.
                </Text>
            </div>
            <div
            >
                <Image
                    src='https://cdn.tgdd.vn/hoi-dap/1174141/goi-video-call-la-gi-neu-may-khong-trang-bi-san-th-1-800x450.jpg'
                />
            </div>
        </div>
    );
}
