import React, { Component } from "react";

class Input extends Component {
    render() {
        const { type, icon, placeHolder } = this.props;
        return (
            <div className="form-group icon-input mb-3">
                <i className={`font-sm ${icon} text-grey-500 pe-0`}></i>
                <input
                    type={type}
                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                    placeholder={placeHolder}
                />
            </div>
        );
    }
}

export default Input;