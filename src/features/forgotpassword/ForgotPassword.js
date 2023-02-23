import React, { Fragment, useState } from 'react';
import { IconMail } from '@tabler/icons-react';
import Input from '@common/components/Input';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';

function ForgotPassword() {
    const [ email, setEmail ] = useState('');
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submitError, setSubmitError ] = useState(false);

    const handleInputChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        switch (name) {
                        case 'email':
                            setEmail(value);
                            break;
                        default:
                            break;
        }
    };

    const form = useForm({
        initialValues: { email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
    };

    return (
        <Fragment>
            <h2 className="fw-700 display1-size display2-md-size mb-4">Forgot password</h2>
            <form>
                <Input
                    icon={<IconMail />}
                    type="text"
                    name="email"
                    placeHolder="Your Email Address"
                    handleInputChange={handleInputChange}
                />
            </form>

            <div className="col-sm-12 p-0 text-left">
                <button
                    type="submit"
                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Send to reset'}
                </button>
            </div>
        </Fragment>
    );
}

export default ForgotPassword;
