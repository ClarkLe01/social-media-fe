import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
function FriendRequest() {
    return (
        <div className="section full pe-3 ps-4 pt-4 position-relative feed-body">
            <div className="card-body d-flex align-items-center p-1">
                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
                    Friend Request
                </h4>
                <Link to="/friend" className="fw-600 ms-auto font-xssss text-primary">
                    See all
                </Link>
            </div>
            <div className="wrap mb-3">
                <div className="card-body d-flex pt-2 pb-0 px-0 bor-0">
                    <div className="col col-md-2">
                        <figure className="avatar me-3">
                            <img
                                src="assets/images/user.png"
                                alt="avater"
                                className="shadow-sm rounded-circle w45"
                            />
                        </figure>
                    </div>
                    <div className="col col-md-9 px-2">
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1 mb-1">
                            Anthony Daugloi
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                12 mutual friends
                            </span>
                        </h4>
                        <div className="card-body d-flex align-items-center justify-content-start p-0 flex-md-wrap">
                            <Button
                                classNames={{
                                    root: 'lh-20 w75 bg-primary-gradiant me-2 p-0 text-white text-center font-xssss fw-600 ls-1 rounded-xxxxl',
                                }}
                            >
                                Confirm
                            </Button>
                            <Button
                                classNames={{
                                    root: 'lh-20 w75 bg-grey me-2 text-grey-800 p-0 text-center font-xssss fw-600 ls-1 rounded-xxxxl',
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const chatMember = [
    { imageUrl: 'user.png', name: 'Hurin Seary', status: 'bg-success' },
    { imageUrl: 'user.png', name: 'Victor Exrixon', status: 'bg-success' },
    { imageUrl: 'user.png', name: 'Surfiya Zakir', status: 'bg-warning' },
    { imageUrl: 'user.png', name: 'Goria Coast', status: 'bg-danger' },
    { imageUrl: 'user.png', name: 'Hurin Seary', status: 'bg-success' },
    { imageUrl: 'user.png', name: 'David Goria', status: 'bg-success' },
    { imageUrl: 'user.png', name: 'Seary Victor', status: 'bg-success' },
    { imageUrl: 'user.png', name: 'Ana Seary', status: 'bg-success' },
];

const SideBar = () => {

    const [ isOpen, setIsOpen ] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuClass = `${isOpen ? ' d-block' : ''}`;

    return (
        <>
            <FriendRequest />
            <hr />
            <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                <div className="section full px-0 pt-4 position-relative feed-body">
                    <h4 className="font-xsss text-grey-900 fw-700 ls-3">Contacts</h4>
                    <ul className="list-group list-group-flush">
                        {chatMember.map((value, index) => (
                            // Start Single Demo
                            <li
                                key={index}
                                className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center"
                            >
                                <figure className="avatar float-left mb-0 me-2">
                                    <img
                                        src={`assets/images/${value.imageUrl}`}
                                        alt="avater"
                                        className="w35"
                                    />
                                </figure>
                                <h3 className="fw-700 mb-0 mt-0">
                                    <span
                                        className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer"
                                        onClick={toggleOpen}
                                    >
                                        {value.name}
                                    </span>
                                </h3>
                                <span
                                    className={`${value.status} ms-auto btn-round-xss`}
                                ></span>
                            </li>
                            // End Single Demo
                        ))}
                    </ul>
                </div>
                <div className="section full px-0 pt-4 pb-4 position-relative feed-body">
                    <h4 className="font-xsss text-grey-900 fw-700 ls-3">Groups</h4>
                    <ul className="list-group list-group-flush">
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <span className="btn-round-sm bg-primary-gradiant me-3 ls-3 text-white font-xssss fw-700">
                                UD
                            </span>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span
                                    className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer"
                                    onClick={toggleOpen}
                                >
                                    Studio Express
                                </span>
                            </h3>
                            <span className="badge mt-0 text-grey-500 badge-pill pe-0 font-xsssss">
                                2 min
                            </span>
                        </li>
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <span className="btn-round-sm bg-gold-gradiant me-3 ls-3 text-white font-xssss fw-700">
                                AR
                            </span>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span
                                    className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer"
                                    onClick={toggleOpen}
                                >
                                    Armany Design
                                </span>
                            </h3>
                            <span className="bg-warning ms-auto btn-round-xss"></span>
                        </li>
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <span className="btn-round-sm bg-mini-gradiant me-3 ls-3 text-white font-xssss fw-700">
                                UD
                            </span>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span
                                    className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer"
                                    onClick={toggleOpen}
                                >
                                    De fabous
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`modal-popup-chat ${menuClass}`} style = {{ right: `calc(var(--mantine-aside-width, 0px) + 0px)` }}>
                <div className="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
                    <div className="modal-popup-header w-100 border-bottom">
                        <div className="card p-3 d-block border-0 d-block">
                            <figure className="avatar mb-0 float-left me-2">
                                <img
                                    src="assets/images/user-12.png"
                                    alt="avater"
                                    className="w35 me-1"
                                />
                            </figure>
                            <h5 className="fw-700 text-primary font-xssss mt-1 mb-1">
                                Hendrix Stamp
                            </h5>
                            <h4 className="text-grey-500 font-xsssss mt-0 mb-0">
                                <span className="d-inline-block bg-success btn-round-xss m-0"></span>{' '}
                                Available
                            </h4>
                            <div
                                className="font-xssss position-absolute right-0 top-0 mt-3 me-4 pointer"
                                onClick={toggleOpen}
                            >
                                <i className="ti-close text-grey-900 mt-2 d-inline-block"></i>
                            </div>
                        </div>
                    </div>
                    <div className="modal-popup-body w-100 p-3 h-auto">
                        <div className="message">
                            <div className="message-content font-xssss lh-24 fw-500">
                                Hi, how can I help you?
                            </div>
                        </div>
                        <div className="date-break font-xsssss lh-24 fw-500 text-grey-500 mt-2 mb-2">
                            Mon 10:20am
                        </div>
                        <div className="message self text-right mt-2">
                            <div className="message-content font-xssss lh-24 fw-500">
                                I want those files for you. I want you to send 1 PDF and 1 image
                                file.
                            </div>
                        </div>
                        <div
                            className="snippet pt-3 ps-4 pb-2 pe-3 mt-2 bg-grey rounded-xl float-right"
                            data-title=".dot-typing"
                        >
                            <div className="stage">
                                <div className="dot-typing"></div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-popup-footer w-100 border-top">
                        <div className="card p-3 d-block border-0 d-block">
                            <div className="form-group icon-right-input style1-input mb-0">
                                <input
                                    type="text"
                                    placeholder="Start typing.."
                                    className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
                                />
                                <i className="feather-send text-grey-500 font-md"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
