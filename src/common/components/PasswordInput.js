import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

// class PasswordInput extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             showPassword: false,
//         };
//     }

//     toggleShowPassword = () => {
//         this.setState((prevState) => ({
//             showPassword: !prevState.showPassword,
//         }));
//     };

//     render() {
//         const { showPassword } = this.state;
//         const { icon, label, placeholder, ...rest } = this.props;
//         const iconEye = showPassword
//             ? <IconEye
//                 className='text-grey-900 font-xsss'
//             />
//             : <IconEyeOff
//                 className='text-grey-900 font-xsss'
//             />;
//         return (
//             <TextInput
//                 icon={icon}
//                 type={showPassword ? 'text' : 'password'}
//                 rightSection={<div onClick={this.toggleShowPassword}>{iconEye}</div>}
//                 label={label}
//                 placeholder={placeholder}
//                 {...rest}
//             />
//         );
//     }
// }

function PasswordInput(props) {
    const [ showPassword, setShowPassword ] = useState(false);
    const { icon, label, placeholder, ...rest } = props;

    const iconEye = showPassword ? <IconEye className='text-grey-900 font-xsss' /> : <IconEyeOff className='text-grey-900 font-xsss' />;

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <TextInput
            icon={icon}
            type={showPassword ? 'text' : 'password'}
            rightSection={<div onClick={toggleShowPassword}>{iconEye}</div>}
            label={label}
            placeholder={placeholder}
            {...rest}
        />
    );
}

export default PasswordInput;
