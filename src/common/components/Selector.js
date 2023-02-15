import React, { Component } from "react";
import Select from 'react-select';

class Selector extends Component {
    render() {
        const { options } = this.props;
        const selectStyle = {
            width: "100%",

            padding: "6px 8px 6px 40px",
            border: "2px #eee solid",
            borderRadius: '7px',
            background: "transparent",
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
        };
        return (
            <div className="form-group icon-input mb-3">
                <label className="text-grey-900 font-xsss fw-300">Gender</label>
                {/* <select
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    style={selectStyle}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
                <Select
                    options={options}
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            ...selectStyle,
                        }),
                    }}
                />
            </div>
        );
    }
}


export default Selector;