import React from "react";
import { DatePickerInput } from '@mantine/dates';

function DateTimePicker(props) {
    const { name, icon, placeHolder, handleInputChange, value, ...other } = props;  
    return (
        <div className="form-group icon-input mb-3">
            <DatePickerInput
                name={name}
                icon={icon}
                placeholder={placeHolder}
                classNames={{
                    input: 'form-control pt-0 font-xsss fw-600',
                    placeholder: 'text-grey-600',
                }}
                valueFormat="DD/MM/YYYY"
                onChange={handleInputChange}
                value={value}
                hideOutsideDates
                defaultLevel="year"
                // error
                
                {...other}
            />
        </div>
    );
}

export default DateTimePicker;