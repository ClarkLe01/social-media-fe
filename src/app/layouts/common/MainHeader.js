import React from 'react';
import Header from './Header';
import MainLogo from '@common/components/MainLogo';
import NavButton from '@common/components/NavMenuButton';

const MainHeader = ({ children }) => {
    return (
        <Header>
            <MainLogo />
            <NavButton />
        </Header>
    );
};

export default MainHeader;
