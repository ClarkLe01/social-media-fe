import React, { Component } from "react";
import { DatePicker } from '@mantine/dates';


class DateTimePicker extends Component {
    render() {
        const { icon } = this.props;
        return (
            <div className="form-group icon-input mb-3">
                <DatePicker 
                    icon={icon}
                    placeholder="Pick date" 
                    classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
                    styles={{ input: { backgroundColor: '#fff!important' } }}
                    inputFormat="DD-MM-YYYY"
                />
            </div>
        );
    }
}
export default DateTimePicker;