import React from 'react';

function PopupChat(props) {
    const { event } = props;
    return (
        <div className={`modal-popup-chat ${event}`}>
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
                        <h5 className="fw-700 text-primary font-xssss mt-1 mb-1">Hendrix Stamp</h5>
                        <h4 className="text-grey-500 font-xsssss mt-0 mb-0">
                            <span className="d-inline-block bg-success btn-round-xss m-0"></span>{' '}
                            Available
                        </h4>
                        <div
                            className="font-xssss position-absolute right-0 top-0 mt-3 me-4 pointer"
                            onClick={this.toggleOpen}
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
                            I want those files for you. I want you to send 1 PDF and 1 image file.
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
    );
}

export default PopupChat;
