import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import React from 'react';

function DarkLightTheme() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
        >
            {dark ?
                <IconSun size={16} stroke={1.5} />
                :
                <IconMoonStars size={16} stroke={1.5} />}
        </ActionIcon>
    );
}

export default DarkLightTheme;