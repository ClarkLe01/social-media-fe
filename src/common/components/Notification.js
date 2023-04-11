import { IconBellFilled } from '@tabler/icons-react';

import React from 'react';
import { ScrollArea, Popover, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';

function Notification() {
    return (
        <React.Fragment>
            <Popover position='bottom-end' width={350} withArrow>
                <Popover.Target>
                    <ActionIcon className="ms-auto">
                        <IconBellFilled />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <div className="d-flex">
                        <h4 className="fw-700 font-xss mb-4 me-auto">Notification</h4>
                        <Link to="/notification" className="fw-700 font-xssss mb-4">
                            See all
                        </Link>
                    </div>
                    <ScrollArea style={{ height: 350 }}>
                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Hendrix Stamp{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    3 min
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                There are many variations of pass..
                            </h6>
                        </div>
                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Goria Coast{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    2 min
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                Mobile Apps UI Designer is require..
                            </h6>
                        </div>

                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Surfiya Zakir{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    1 min
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                Mobile Apps UI Designer is require..
                            </h6>
                        </div>
                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Victor Exrixon{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    30 sec
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                Mobile Apps UI Designer is require..
                            </h6>
                        </div>
                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Victor Exrixon{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    30 sec
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                Mobile Apps UI Designer is require..
                            </h6>
                        </div>
                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Victor Exrixon{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    30 sec
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                Mobile Apps UI Designer is require..
                            </h6>
                        </div>
                        <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
                            <img
                                src="assets/images/user.png"
                                alt="user"
                                className="w40 position-absolute left-0"
                            />
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                Victor Exrixon{' '}
                                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                                    {' '}
                                    30 sec
                                </span>
                            </h5>
                            <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                Mobile Apps UI Designer is require..
                            </h6>
                        </div>
                    </ScrollArea>
                </Popover.Dropdown>
            </Popover>
        </React.Fragment>
    );
}
export default Notification;
