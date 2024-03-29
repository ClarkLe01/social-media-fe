import React from "react";
import { TextInput } from '@mantine/core';
import PasswordInput from "./PasswordInput";

function Input(props) {
    const { name, type, icon, placeHolder, handleInputChange, className, value, ...other } = props;
    return (
        <div className="form-group icon-input mb-3 h-100">
            {(type === 'password') ? (
                <PasswordInput
                    name={name}
                    icon={icon}
                    placeholder={placeHolder}
                    classNames={{
                        input: 'form-control text-grey-900 font-xsss fw-600',
                    }}
                    onChange={handleInputChange}
                    {...other}
                />
            ) : (
                <TextInput
                    name={name}
                    icon={icon}
                    type={type}
                    classNames={{
                        input: className?className:'form-control text-grey-900 font-xsss fw-600',
                    }}
                    placeholder={placeHolder}
                    onChange={handleInputChange}
                    value={value}
                    {...other}
                />
            )}
        </div>
    );
}

export default Input;