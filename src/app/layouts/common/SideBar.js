import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <>
            <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3'>
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xsss text-grey-900">
                        Friend Request
                    </h4>
                    <Link to="/friend" className="fw-600 ms-auto font-xssss text-primary">
                        See all
                    </Link>
                </div>
                <div className="wrap">
                    <div className="card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0">
                        <figure className="avatar me-3">
                            <img src="assets/images/user.png" alt="avater" className="shadow-sm rounded-circle w45" />
                        </figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            Anthony Daugloi
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                12 mutual friends
                            </span>
                        </h4>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-center pt-0 ps-4 pe-4 pb-4 flex-md-wrap">
                        <a href="/defaultmember" className="mt-2 p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl">
                            Confirm
                        </a>
                        <a href="/defaultmember" className="mt-2 p-2 lh-20 w100 bg-grey me-2 text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl">
                            Delete
                        </a>
                    </div>
                </div>
            </div>
            <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                <div className="section full pe-3 ps-4 pt-4 position-relative feed-body">
                    <h4 className="font-xsss text-grey-900 fw-700 ls-3">
                        Contacts
                    </h4>
                    <ul className="list-group list-group-flush">
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Hurin Seary
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li>
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li>
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li>
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li><li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <figure className="avatar float-left mb-0 me-2">
                                <img src="assets/images/user.png" alt="avater" className="w35" />
                            </figure>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Victor Exrixon
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="section full pe-3 ps-4 pt-4 pb-4 position-relative feed-body">
                    <h4 className="font-xsss text-grey-900 fw-700 ls-3">
                        Groups
                    </h4>
                    <ul className="list-group list-group-flush">
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <span className="btn-round-sm bg-primary-gradiant me-3 ls-3 text-white font-xssss fw-700">
                                UD
                            </span>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
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
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    Armany Design
                                </span>
                            </h3>
                            <span className="bg-warning ms-auto btn-round-xss">
                            </span>
                        </li>
                        <li className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center">
                            <span className="btn-round-sm bg-mini-gradiant me-3 ls-3 text-white font-xssss fw-700">
                                UD
                            </span>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer">
                                    De fabous
                                </span>
                            </h3>
                            <span className="bg-success ms-auto btn-round-xss">
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBar;
