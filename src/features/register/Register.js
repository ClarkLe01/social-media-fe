import React, { useState, Fragment } from "react";
import { IconUser, IconLock, IconCake, IconGenderMale, IconMail } from '@tabler/icons-react';
import Input from "@common/components/Input";
import DateTimePicker from "@common/components/DatetimePicker";
import Selector from "@common/components/Selector";
import { Link } from 'react-router-dom';


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
    const genderOptions = [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'nonbinary', label: 'Non-binary' } ];

    const handleInputChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        console.log(event.target.name);
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
    const handleDatePickerChange = (event) => {
        setDate(event);
        console.log(event);
        console.log(date);
    };
    const handleSelectorChange = (event) => {
        setGender(event);
        console.log(event);
        console.log(gender);
    };

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setAcceptTerms(checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(false);
        setSubmitError(false);
        console.log({ firstName, lastName, date, email, password, confirmPassword, acceptTerms, gender });
    };
    
    return (
        <Fragment>
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Insane </span> </a>
                        <button className="nav-menu me-0 ms-auto"></button>
                        <a href="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">Login</a>
                        <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: `url("http://sociala.uitheme.net/assets/images/login-bg-2.jpg")` }}></div>
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">New Account</h2>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <Input
                                            icon={<IconUser />}
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            placeHolder="First Name"
                                            handleInputChange={handleInputChange}
                                        />
                                        <Input
                                            icon={<IconUser />}
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            placeHolder="Last Name"
                                            handleInputChange={handleInputChange}
                                        />
                                    </div>
                                    <Input
                                        icon={<IconMail />}
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeHolder="Your Email Address"
                                        handleInputChange={handleInputChange}
                                    />
                                    <Input
                                        icon={<IconLock />}
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeHolder="Password"
                                        handleInputChange={handleInputChange}
                                    />
                                    <Input
                                        icon={<IconLock />}
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        placeHolder="Confirm Password"
                                        handleInputChange={handleInputChange}
                                    />
                                    <DateTimePicker
                                        icon={<IconCake />}
                                        name="datetime"
                                        value={date}
                                        placeholder="YYYY-MM-DD"
                                        handleInputChange={handleDatePickerChange}
                                    />
                                    <Selector
                                        icon={<IconGenderMale />}
                                        name="gender"
                                        value={gender}
                                        options={genderOptions}
                                        handleInputChange={handleSelectorChange}
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
                                        <label className="form-check-label font-xsss text-grey-500" htmlFor="acceptTerms">Accept Term and Conditions</label>
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
                                    Already have an account? <Link to="/login" className="fw-700 ms-1">Login</Link>
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
}


export default Register;