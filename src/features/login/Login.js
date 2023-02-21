import React, { Fragment, useState } from 'react';
import { IconLock, IconMail } from '@tabler/icons-react';
import Input from '@common/components/Input';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
// import UnAuthenticatedCallApi from '@services/axios';

function Login() {
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const form = useForm({
        initialValues: { password: '', email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value === '' ? 'This field is required' : null),
        },
    });

    const handleSubmit = async (values) => {
        // const isValid = await form.validate();  // it will raise dict {'hasError':false,...}
        const isValid = await form.isValid(); // validate form
        console.log(isValid);
        if (isValid) {
            const data = {
                email: values.email,
                password: values.password,
            };
            console.log(data);
        }
    };

    return (
        <Fragment>
            <h2 className="fw-700 display1-size display2-md-size mb-3">
                Login your account
            </h2>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Input
                    icon={<IconMail />}
                    type="text"
                    name="email"
                    placeHolder="Your Email Address"
                    {...form.getInputProps('email')}
                />
                <Input
                    icon={<IconLock />}
                    type="password"
                    name="password"
                    placeHolder="Password"
                    {...form.getInputProps('password')}
                />
                <div className="form-check text-left mb-3">
                    <input type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
                    <label className="form-check-label font-xsss text-grey-500">Remember me</label>
                    <a href="/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right">
                        Forgot your Password?
                    </a>
                </div>
                <div className="col-sm-12 p-0 text-left">
                    <button
                        type="submit"
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Login'}
                    </button>
                </div>
            </form>
            <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                Dont have account{' '}
                <Link to="/register" className="fw-700 ms-1">
                    Register
                </Link>
            </h6>

            <div className="col-sm-12 p-0 text-center mt-2">
                <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                    Or, Sign in with your social account{' '}
                </h6>
                <div className="form-group mb-1">
                    <Link
                        to="/register"
                        className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"
                    >
                        <img
                            src="assets/images/icon-1.png"
                            alt="icon"
                            className="ms-2 w40 mb-1 me-5"
                        />{' '}
                        Sign in with Google
                    </Link>
                </div>
                <div className="form-group mb-1">
                    <Link
                        to="/register"
                        className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                    >
                        <img
                            src="assets/images/icon-3.png"
                            alt="icon"
                            className="ms-2 w40 mb-1 me-5"
                        />{' '}
                        Sign in with Facebook
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
