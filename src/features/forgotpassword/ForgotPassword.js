import React, { Fragment, useState } from 'react';
import { IconAlertCircle, IconMail } from '@tabler/icons-react';
import Input from '@common/components/Input';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { navigatePath } from '@app/routes/config';
import useAuth, { requestResetPassword } from '@services/controller/useAuth';
import { Alert } from '@mantine/core';

function ForgotPassword() {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submitSuccess, setSubmitSuccess ] = useState({ status: false, message: '' });

    const { requestResetPassword } = useAuth();
    

    const form = useForm({
        initialValues: { email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });


    const handleRequestResetPassword= (values) => {
        setIsSubmitting(true);
        requestResetPassword(
            {
                data: {
                    email: values.email,
                },
            },
            {
                onSuccess: (data) => {
                    setSubmitSuccess(data.data);
                    setIsSubmitting(false);
                    if(data.data.status == false){
                        form.setErrors({ email: data.data.message });
                    }
                },
                onError: (error) => {
                    setSubmitSuccess(false);
                    setIsSubmitting(false);
                    form.setErrors({ email: 'Something went wrong!' });
                    console.log(error);
                },
            },
        );
    };

    return (
        <Fragment>
            <h2 className="fw-700 display1-size display2-md-size mb-4">Forgot password</h2>
            {submitSuccess.status ? (
                <Alert icon={<IconAlertCircle size={16} />} title="Success!" color="teal">
                    {submitSuccess.message}
                </Alert>
            ): (
                <>
                    <form onSubmit={form.onSubmit(handleRequestResetPassword)}>
                        <Input
                            icon={<IconMail />}
                            type="text"
                            name="email"
                            placeHolder="Your Email Address"
                            {...form.getInputProps('email')}
                        />
                        <div className="col-sm-12 p-0 text-left">
                            <button
                                type="submit"
                                className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Send to reset'}
                            </button>
                        </div>
                    </form>

                    
                </>
            )}
            
        </Fragment>
    );
}

export default ForgotPassword;
