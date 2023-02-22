import React, { Fragment, useState } from 'react';
import { IconLock } from '@tabler/icons-react';
import Input from '@common/components/Input';
import { Link } from 'react-router-dom';
// import UnAuthenticatedCallApi from '@services/axios';
import { useForm } from '@mantine/form';

function ResetPassword() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submitError, setSubmitError ] = useState(false);

    const handleInputChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        switch (name) {
                        case 'email':
                            setEmail(value);
                            break;
                        case 'password':
                            setPassword(value);
                            break;
                        default:
                            break;
        }
    };

    const form = useForm({
        initialValues: { password: '', email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const isValid = await form.validate();  // it will raise dict {'hasError':false,...}
        const isValid = await form.isValid(); // validate form
        console.log(isValid);
        if (isValid) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
            }, 3000);
            setSubmitError(false);
        } else {
            setSubmitError(true);
            setIsSubmitting(false);
        }
        // setIsSubmitting(true);
        // const data = {
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password: password,
        //     confirm_password: confirmPassword,
        //     gender: gender,
        //     birthday: date,
        // };
        // try {
        //     const resp = await UnAuthenticatedCallApi.post('/user/register/', data);
        //     setIsSubmitting(false);
        //     if (resp.status != 201) {
        //         setSubmitError(true);
        //     }
        // }
        // catch (error) {
        //     console.log(error);
        //     setIsSubmitting(false);
        // }
    };

    return (
        <Fragment>
            <h2 className="fw-700 display1-size display2-md-size mb-4">
                Change <br />
                your password
            </h2>
            <form>
                <Input icon={<IconLock />} type="password" name="password" placeHolder="Password" />
                <Input
                    icon={<IconLock />}
                    type="password"
                    name="confirmPassword"
                    placeHolder="Confirm Password"
                />
                <div className="form-check text-left mb-3">
                    <input type="checkbox" className="form-check-input mt-2" id="exampleCheck4" />
                    <label className="form-check-label font-xsss text-grey-500">
                        Accept Term and Conditions
                    </label>
                </div>
            </form>

            <div className="col-sm-12 p-0 text-left">
                <button
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Change Password'}
                </button>
            </div>
        </Fragment>
    );
}

export default ResetPassword;
