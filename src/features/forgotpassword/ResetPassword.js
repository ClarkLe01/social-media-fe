import React, { Fragment, useEffect, useState } from 'react';
import { IconAlertCircle, IconLock } from '@tabler/icons-react';
import Input from '@common/components/Input';
import { Link, useParams } from 'react-router-dom';

import { useForm } from '@mantine/form';
import { useAuth } from '@services/controller';
import { Alert } from '@mantine/core';

function ResetPassword() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submitError, setSubmitError ] = useState(false);
    const [ validateSuccess, setValidateSuccess ] = useState({ status: false, message: '' });
    const [ changeSuccess, setChangeSuccesss ] = useState({ status: 0, message: '' });

    const { uid, token } = useParams();
    const { validateResetPassword, resetPassword } = useAuth();

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
    useEffect(() => {
        validateResetPassword(
            {
                pathParams: { uid: uid, token: token },
            },
            {
                onSuccess: (data) => {
                    console.log(data.data);
                    setValidateSuccess(data.data);

                },
                onError: (error) => {
                    setValidateSuccess({ status: false, message: 'Something wrong' });
                },
            },
        );
    }, []);

    const form = useForm({
        initialValues: { password: '', email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            password: (value) =>
                value.length < 6 ? 'Password must have at least 6 letters' : null,
            confirmPassword: (value, values) =>
                value !== values.password ? 'Confirm Password did not match' : null,
        },
    });

    const handleResetPassword= (values) => {
        setIsSubmitting(true);
        resetPassword(
            {
                data: {
                    password: values.password,
                    confirm_password: values.confirmPassword,
                },
                pathParams: { uid: uid, token: token },
            },
            {
                onSuccess: (data) => {
                    setIsSubmitting(false);
                    setChangeSuccesss(data.data);
                },
                onError: (error) => {
                    setChangeSuccesss({ status: -1, message: 'Something went wrong!' });
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <Fragment>
            <h2 className="fw-700 display1-size display2-md-size mb-4">
                Change <br />
                your password
            </h2>
            {changeSuccess.status == -1 && (
                <Alert icon={<IconAlertCircle size={16} />} title="Change Successfully!" color="red">
                    {changeSuccess.message}
                </Alert>
            )}
            {validateSuccess.status && changeSuccess.status != 1 && (
                <form onSubmit={form.onSubmit(handleResetPassword)}>
                    <Input 
                        icon={<IconLock />} 
                        type="password" 
                        name="password" 
                        placeHolder="Password"
                        autoComplete="off"
                        {...form.getInputProps('password')}
                    />
                    <Input
                        icon={<IconLock />}
                        type="password"
                        name="confirmPassword"
                        placeHolder="Confirm Password"
                        autoComplete="off"
                        {...form.getInputProps('confirmPassword')}
                    />
                    <div className="col-sm-12 p-0 text-left">
                        <button
                            type="submit"
                            className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Change Password'}
                        </button>
                    </div>
                </form>
            )}
            {!validateSuccess.status && (
                <Alert icon={<IconAlertCircle size={16} />} title="Failed!" color="red">
                    {validateSuccess.message}
                </Alert>
            )}

            {changeSuccess.status == 1 && (
                <Alert icon={<IconAlertCircle size={16} />} title="Change Successfully!" color="teal">
                    {changeSuccess.message}
                </Alert>
            )}
            
        </Fragment>
    );
}

export default ResetPassword;
