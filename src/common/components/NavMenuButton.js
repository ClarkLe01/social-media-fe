import React from 'react';
import { Burger } from '@mantine/core';

function NavMenuButton() {
    const [ opened, setOpened ] = React.useState(false);
    const [ classN, setClassN ] = React.useState("");

    React.useEffect(() => {
        const handleResize = () => {
            (window.innerWidth < 992) ? setClassN("w-auto d-inline-block p-1 me-0 ms-2") : setClassN("w-auto d-none p-1 me-0 ms-2");
        };

        window.addEventListener('resize', handleResize);

        //Clean up function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <Burger
                className={classN || ((window.innerWidth < 992) ? ("w-auto d-inline-block p-1 me-0 ms-2") : ("w-auto d-none p-1 me-0 ms-2"))}
                opened={opened}
                onClick={() => setOpened((o) => !o)}
            />
            {/* <button className="nav-menu me-0 ms-auto "></button> */}
        </>
    );
}
export default NavMenuButton;