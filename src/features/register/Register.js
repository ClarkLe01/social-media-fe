import React, { Fragment, useState } from 'react';
import { IconUser, IconLock, IconCake, IconGenderMale, IconMail } from '@tabler/icons-react';
import Input from '@common/components/Input';
import DateTimePicker from '@common/components/DatetimePicker';
import Selector from '@common/components/Selector';
import { Link } from 'react-router-dom';
import UnAuthenticatedCallApi from '@services/axios';
import { useForm } from '@mantine/form';

function Register() {
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'nonbinary', label: 'Non-binary' },
    ];


    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            firstName: (value) => (value === '' ? 'Please input your firstname' : null),
            lastName: (value) => (value === '' ? 'Please input your lastname' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 6 ? 'Password must have at least 6 letters' : null,
            confirmPassword: (value, values) =>
                value !== values.password ? 'Confirm Password did not match' : null,
            birthday: (value) => (value == undefined ? 'Please choose your birthday' : null),
            gender: (value) => (value === '' ? 'Please choose your gender' : null),
        },
    });

    const handleSubmit = async (values) => {
        // const isValid = form.validate(); // it will raise dict {'hasError':false,...}
        // setIsSubmitting(true);
        const isValid = await form.isValid(); // validate form        
        if (isValid) {
            const data = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
                confirm_password: values.confirmPassword,
                gender: values.gender,
                birthday: values.birthday,
            };
            try {
                setIsSubmitting(true);
                await UnAuthenticatedCallApi.post('/user/register', data);
                setIsSubmitting(false);
            } catch (error) {
                const response = error.response;
                form.setFieldError('email', response.data);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <Fragment>
            <h2 className="fw-700 display1-size display2-md-size mb-3">New Account</h2>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Input
                        name="firstName"
                        icon={<IconUser />}
                        type="text"
                        placeHolder="First Name"
                        {...form.getInputProps('firstName')}
                    />
                    <Input
                        name="lastName"
                        icon={<IconUser />}
                        type="text"
                        placeHolder="Last Name"
                        {...form.getInputProps('lastName')}
                    />
                </div>
                <Input
                    name="email"
                    icon={<IconMail />}
                    type="text"
                    placeHolder="Your Email Address"
                    {...form.getInputProps('email')}
                />
                <Input
                    name="password"
                    icon={<IconLock />}
                    type="password"
                    placeHolder="Password"
                    {...form.getInputProps('password')}
                />
                <Input
                    name="confirmPassword"
                    icon={<IconLock />}
                    type="password"
                    placeHolder="Confirm Password"
                    {...form.getInputProps('confirmPassword')}
                />
                <DateTimePicker
                    name="birthday"
                    icon={<IconCake />}
                    placeHolder="Pick your birthday"
                    {...form.getInputProps('birthday')}
                />
                <Selector
                    name="gender"
                    icon={<IconGenderMale />}
                    placeHolder="Choose your gender"
                    options={genderOptions}
                    {...form.getInputProps('gender')}
                />
                <button
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
            </form>
            <h6 className="text-grey-500 font-xsss fw-500 mt-1 mb-0 lh-32">
                Already have an account?{' '}
                <Link to="/login" className="fw-700 ms-1">
                    Login
                </Link>
            </h6>
        </Fragment>
    );
}

export default Register;
