import React from "react";
import { DatePicker } from '@mantine/dates';


// class DateTimePicker extends Component {
//     render() {
//         const { icon } = this.props;
//         return (
//             <div className="form-group icon-input mb-3">
//                 <DatePicker
//                     icon={icon}
//                     placeholder="Pick date"
//                     classNames={{ input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600' }}
//                     styles={{ input: { backgroundColor: '#fff!important' } }}
//                     inputFormat="DD-MM-YYYY"
//                 />
//             </div>
//         );
//     }
// }

function DateTimePicker(props) {
    const { icon, placeHolder, handleInputChange } = props;

    return (
        <div className="form-group icon-input mb-3">
            <DatePicker
                icon={icon}
                placeholder={placeHolder}
                classNames={{
                    input: 'style2-input ps-5 form-control text-grey-900 font-xsss fw-600',
                }}
                styles={{ input: { backgroundColor: '#fff!important' } }}
                inputFormat="DD-MM-YYYY"
                onChange={handleInputChange}
            />
        </div>
    );
}

export default DateTimePicker;