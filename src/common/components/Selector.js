import React from "react";
import { Select } from '@mantine/core';

function Selector(props) {
    const { value, icon, placeHolder, options, handleInputChange } = props;

    return (
        <div className="form-group icon-input mb-3">
            <Select
                value={value}
                icon={icon}
                placeholder={placeHolder}
                data={options}
                classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
                styles={{ input: { backgroundColor: '#fff!important' } }}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Selector;