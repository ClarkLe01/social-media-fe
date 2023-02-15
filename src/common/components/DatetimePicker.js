import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";


class DateTimePicker extends Component {
    render() {
        const { name, value, placeholder, onChange } = this.props;
        return (
            <div className="form-group icon-input mb-3">
                <label className="text-grey-900 font-xsss fw-300">Birthday</label>
                <Flatpickr
                    value={value}
                    onChange={onChange}
                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                    placeholder={placeholder}
                    name={name}
                    options={{ dateFormat: "d-m-Y", enableTime: false }}
                    style = {{ backgroundColor: '#ffff' }}
                />
            </div>
        );
    }
}
export default DateTimePicker;