import React, { Component, Fragment } from "react";
import Input from "@common/components/Input";
import DateTimePicker from "@common/components/DatetimePicker";
import { Link } from 'react-router-dom';
import Selector from "@common/components/Selector";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            date: new Date(),
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
            isSubmitting: false,
            submitError: false,
            gender: "",
        };
        this.genderOptions = [
            { value: "", label: "Select your gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "nonbinary", label: "Non-binary" },
        ];
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
        });
    };

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        const { firstName, lastName, date, email, password, confirmPassword, acceptTerms, isSubmitting, submitError, gender } = this.state;
        return (
            <Fragment>
                <div className="main-wrap">
                    <div className="nav-header bg-transparent shadow-none border-0">
                        <div className="nav-top w-100">
                            <a href="/"><i className="feather-zap text-success display1-size me-2 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </a>
                            <button className="nav-menu me-0 ms-auto"></button>
                            <a href="/login" className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">Login</a>
                            <a href="/register" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">Register</a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                            style={{ backgroundImage: `url("https://via.placeholder.com/800x950.png")` }}></div>
                        <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                            <div className="card shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">
                                    <h2 className="fw-700 display1-size display2-md-size mb-4">New Account</h2>
                                    <form onSubmit={this.handleSubmit}>
                                        <div style={{ display: 'flex', gap: '16px' }}>
                                            <Input
                                                icon="ti-user"
                                                type="text"
                                                name="firstName"
                                                value={firstName}
                                                placeHolder="First Name"
                                                handleInputChange={this.handleInputChange}
                                            />
                                            <Input
                                                icon="ti-user"
                                                type="text"
                                                name="lastName"
                                                value={lastName}
                                                placeHolder="Last Name"
                                                handleInputChange={this.handleInputChange}
                                            />
                                        </div>
                                        <Input
                                            icon="ti-email"
                                            type="text"
                                            name="email"
                                            value={email}
                                            placeHolder="Your Email Address"
                                            handleInputChange={this.handleInputChange}
                                        />
                                        <Input
                                            icon="ti-lock"
                                            type="password"
                                            name="password"
                                            value={password}
                                            placeHolder="Password"
                                            handleInputChange={this.handleInputChange}
                                        />
                                        <Input
                                            icon="ti-lock"
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            placeHolder="Confirm Password"
                                            handleInputChange={this.handleInputChange}
                                        />
                                        <DateTimePicker
                                            name="datetime"
                                            value={date}
                                            placeholder="YYYY-MM-DD"
                                            onChange={(date) => this.setState({ date })}
                                        />
                                        <Selector
                                            name="gender"
                                            value={gender}
                                            options={[
                                                { value: "male", label: "Male" },
                                                { value: "female", label: "Female" },
                                            ]}
                                            handleInputChange={this.handleInputChange}
                                        />
                                        <div className="form-check text-left mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input mt-2"
                                                id="acceptTerms"
                                                name="acceptTerms"
                                                checked={acceptTerms}
                                                onChange={this.handleCheckboxChange}
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
}

export default Register;