import React from "react";
import { TextInput } from '@mantine/core';
import PasswordInput from "./PasswordInput";

function Input(props) {
    const { name, type, icon, placeHolder, handleInputChange } = props;
    return (
        <div className="form-group icon-input mb-3">
            {type === 'password' ? (
                <PasswordInput
                    icon={icon}
                    placeholder={placeHolder}
                    classNames={{
                        input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600',
                    }}
                    onChange={handleInputChange}
                    name={name}
                />
            ) : (
                <TextInput
                    icon={icon}
                    type={type}
                    classNames={{
                        input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600',
                    }}
                    placeholder={placeHolder}
                    onChange={handleInputChange}
                    name={name}
                />
            )}
        </div>
    );
}

export default Input;