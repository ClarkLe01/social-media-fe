import React from "react";
import { Select } from '@mantine/core';

function Selector(props) {
    const { name, value, icon, placeHolder, options, handleInputChange, ...other } = props;

    return (
        <div className="form-group icon-input mb-3">
            <Select
                name={name}
                value={value}
                icon={icon}
                placeholder={placeHolder}
                data={options}
                classNames={{ input: 'form-control text-grey-900 font-xsss fw-600' }}
                styles={{ input: { backgroundColor: '#fff!important' } }}
                onChange={handleInputChange}
                {...other}
            />
        </div>
    );
}

export default Selector;