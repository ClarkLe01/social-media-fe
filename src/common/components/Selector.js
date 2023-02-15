import React, { Component } from "react";
import { Select } from '@mantine/core';

class Selector extends Component {
    render() {
        const { options } = this.props;
        return (
            <div className="form-group icon-input mb-3">
                <Select
                    label="Gender"
                    placeholder="Choose gender" 
                    data={options}
                    classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
                    styles={{ input: { backgroundColor: '#fff!important' } }}
                />
            </div>
        );
    }
}


export default Selector;