import React from "react";
import { DatePicker } from '@mantine/dates';

function DateTimePicker(props) {
    const { name, icon, placeHolder, handleInputChange, ...other } = props;

    return (
        <div className="form-group icon-input mb-3">
            <DatePicker
                name={name}
                icon={icon}
                placeholder={placeHolder}
                classNames={{
                    input: 'form-control text-grey-900 font-xsss fw-600',
                }}
                styles={{ input: { backgroundColor: '#fff!important' } }}
                inputFormat="DD-MM-YYYY"
                onChange={handleInputChange}
                error 
                {...other}
            />
        </div>
    );
}

export default DateTimePicker;