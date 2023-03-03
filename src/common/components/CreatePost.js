import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
// import { useDisclosure } from '@mantine/hooks';
// import { Modal, Group, Button } from '@mantine/core';
import { CloseButton, Group } from '@mantine/core';
function CreatePost() {
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-2 pe-4 pb-3 mb-3">
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className='d-flex justify-content-between'>
                    <div className='px-3'></div>
                    <Modal.Title 
                        className='fw-bold'
                    >
                            Create Post
                    </Modal.Title>
                    <CloseButton size="xl" iconSize={20} onClick={handleClose} />
                </Modal.Header>
                <Modal.Body>
                    <div className=''>

                    </div>
                    <div className='text-content'>

                    </div>
                    <div className='image-video-content'>

                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            {/* <Modal
                opened={show}
                onClose={handleClose}
                title="ABC"
                classNames={{
                    header: '',
                    title: 'fw-bold',
                }}
            >
                <div className='d-flex justify-content-center'>
                    abc
                </div>
                <div className='d-flex justify-content-center'>
                    abc
                </div>
            </Modal> */}
            <div className="card-body p-0 mt-3 position-relative" onClick={handleShow}>
                <figure className="avatar position-absolute ms-2 mt-1 top-5">
                    <img
                        src="assets/images/user.png"
                        alt="icon"
                        className="shadow-sm rounded-circle w30"
                    />
                </figure>
                <textarea
                    name="message"
                    className="create-post h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    cols="30"
                    rows="10"
                    placeholder="What's on your mind?"
                    disabled
                ></textarea>
            </div>

            <div className="card-body d-flex p-0 mt-0">
                <a
                    href="#video"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                >
                    <i className="font-md text-danger feather-video me-2"></i>
                    <span className="d-none-xs">Live Video</span>
                </a>
                <a
                    href="#photo"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                >
                    <i className="font-md text-success feather-image me-2"></i>
                    <span className="d-none-xs">Photo/Video</span>
                </a>
                <a
                    href="#activity"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                >
                    <i className="font-md text-warning feather-camera me-2"></i>
                    <span className="d-none-xs">Feeling/Activity</span>
                </a>
            </div>
        </div>
    );
}

export default CreatePost;
