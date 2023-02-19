import React, { Fragment, useState } from 'react';
import { IconUser, IconLock, IconCake, IconGenderMale, IconMail } from '@tabler/icons-react';
import Input from '@common/components/Input';
import DateTimePicker from '@common/components/DatetimePicker';
import Selector from '@common/components/Selector';
import { Link } from 'react-router-dom';
import UnAuthenticatedCallApi from '@services/axios';
import { useForm } from '@mantine/form';

function Register() {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ date, setDate ] = useState(new Date());
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ acceptTerms, setAcceptTerms ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submitError, setSubmitError ] = useState(false);
    const [ gender, setGender ] = useState('');
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'nonbinary', label: 'Non-binary' },
    ];

    const handleInputChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        switch (name) {
                        case 'firstName':
                            setFirstName(value);
                            break;
                        case 'lastName':
                            setLastName(value);
                            break;
                        case 'email':
                            setEmail(value);
                            break;
                        case 'password':
                            setPassword(value);
                            break;
                        case 'confirmPassword':
                            setConfirmPassword(value);
                            break;
                        case 'gender':
                            setGender(value);
                            break;
                        default:
                            break;
        }
    };

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setAcceptTerms(checked);
    };

    const form = useForm({
        initialValues: { firstName: '', lastName: '', email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            firstName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            lastName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = await form.validate();  // it will raise dict {'hasError':false,...}
        // const isValid = await form.isValid(); // validate form
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
            <h2 className="fw-700 display1-size display2-md-size mb-4">New Account</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Input
                        icon={<IconUser />}
                        type="text"
                        name="firstName"
                        placeHolder="First Name"
                        handleInputChange={handleInputChange}
                        {...form.getInputProps('firstName')}
                    />
                    <Input
                        icon={<IconUser />}
                        type="text"
                        name="lastName"
                        placeHolder="Last Name"
                        handleInputChange={handleInputChange}
                        {...form.getInputProps('lastName')}
                    />
                </div>
                <Input
                    icon={<IconMail />}
                    type="text"
                    name="email"
                    placeHolder="Your Email Address"
                    handleInputChange={handleInputChange}
                    {...form.getInputProps('email')}
                />
                <Input
                    icon={<IconLock />}
                    type="password"
                    name="password"
                    placeHolder="Password"
                    handleInputChange={handleInputChange}
                />
                <Input
                    icon={<IconLock />}
                    type="password"
                    name="confirmPassword"
                    placeHolder="Confirm Password"
                    handleInputChange={handleInputChange}
                />
                <DateTimePicker
                    icon={<IconCake />}
                    placeHolder="Pick your birthday"
                    handleInputChange={(event) => setDate(event)}
                />
                <Selector
                    icon={<IconGenderMale />}
                    placeHolder="Choose your gender"
                    options={genderOptions}
                    handleInputChange={(event) => setGender(event)}
                />
                <div className="form-check text-left mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input mt-2"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={acceptTerms}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label font-xsss text-grey-500" htmlFor="acceptTerms">
                        Accept Term and Conditions
                    </label>
                </div>
                {submitError && <div className="alert alert-danger">{submitError}</div>}
                <button
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
            </form>
            <h6 className="text-grey-500 font-xsss fw-500 mt-3 mb-0 lh-32">
                Already have an account?{' '}
                <Link to="/login" className="fw-700 ms-1">
                    Login
                </Link>
            </h6>
        </Fragment>
    );
}

export default Register;
