import React from "react";
import { Select } from '@mantine/core';

function Selector(props) {
    const { name, icon, options, handleInputChange } = props;

    return (
        <div className="form-group icon-input mb-3">
            <Select
                icon={icon}
                placeholder="Choose gender"
                data={options}
                classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
                styles={{ input: { backgroundColor: '#fff!important' } }}
                onChange={handleInputChange}
                name={name}
            />
        </div>
    );
}

export default Selector;