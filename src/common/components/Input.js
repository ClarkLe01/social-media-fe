import React, { Component } from "react";
import { TextInput } from '@mantine/core';
import PasswordInput from "./PasswordInput";

class Input extends Component {
    render() {
        const { type, icon, placeHolder } = this.props;
        return (
            <div className="form-group icon-input mb-3">
                {
                    type == 'password'
                        ? <PasswordInput
                            icon={icon}
                            placeholder={placeHolder}
                            classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
                        />
                        : <TextInput
                            icon={icon}
                            type={type}
                            classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
                            placeholder={placeHolder}
                        />
                }

            </div>
        );
    }
}

export default Input;