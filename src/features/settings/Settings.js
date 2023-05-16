import Input from '@common/components/Input';
import { Button, Divider, Group, Modal } from '@mantine/core';
import { useAuth } from '@services/controller';
import { IconUser } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Settings() {

    const { saveLoading } = useAuth();

    
    const { logout, profile } = useAuth();
    const [ openedChangePassword, setOpenedChangePassword ] = useState(false);

    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmNewPassword, setConfirmNewPassword ] = useState("");

    const [ differentNewPassword, setDifferentNewPassword ] = useState(false);
    
    const handleChangePassword = () => {
        // if(currentPassword != profile.data){
            
        // }
    };

    return (
        <>
            <div className="card-body p-lg-5 p-4 w-100 border-0">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs">
                            Settings
                        </h4>
                        <div className="nav-caption fw-600 font-xssss text-grey-500 mb-2">
                            Genaral
                        </div>
                        <ul className="list-inline mb-4">
                            <li className="list-inline-item d-block border-bottom me-0">
                                <Link className="pt-2 pb-2 d-flex align-items-center" to="/profile">
                                    <i className="btn-round-md bg-primary-gradiant text-white feather-home font-md me-3"></i>
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Acount Information
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3">
                                    </i>
                                </Link>
                            </li>
                            <li className="list-inline-item d-block  me-0">
                                <Link className="pt-2 pb-2 d-flex align-items-center" to="/password">
                                    <i className="btn-round-md bg-blue-gradiant text-white feather-inbox font-md me-3">
                                    </i>
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Password
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3">
                                    </i>
                                </Link>

                                <Modal
                                    opened={openedChangePassword}
                                    onClose={() => setOpenedChangePassword(false)}
                                    title={<div
                                        className="d-flex justify-content-center">
                                        <h1 className="fw-bold mx-auto">
                                            Edit Password
                                        </h1>
                                    </div>
                                    }
                                    classNames={{
                                        header: 'd-flex justify-content-between',
                                        title: 'flex-fill mx-auto pe-3 my-1',
                                    }}
                                >

                                    <form onSubmit={handleChangePassword}>
                                        <div>
                                            <Divider my="xs" label="Current password" />
                                            <Input
                                                name="currentPassword"
                                                icon={<IconUser />}
                                                type="password"
                                                placeHolder="Current Password"
                                                onChange={e => setCurrentPassword(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Divider my="xs" label="New password" />
                                            <Input
                                                name="newPassword"
                                                icon={<IconUser />}
                                                type="password"
                                                placeHolder="New Password"
                                                onChange={e => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Divider my="xs" label="Confirm new password" />
                                            <Input
                                                name="lastName"
                                                icon={<IconUser />}
                                                type="password"
                                                placeHolder="Confirm new password"
                                                onChange={e => setConfirmNewPassword(e.target.value)}
                                            />
                                        </div>


                                        <div className="col-sm-12 p-0 text-left">
                                            <Button
                                                // type="submit"
                                                className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                                                loading={saveLoading}
                                                onClick={handleChangePassword}
                                            >
                                                {saveLoading ? 'Save...' : 'Save'}
                                            </Button>
                                        </div>
                                    </form>
                                </Modal>
                                <Group position="center">
                                    <Button onClick={() => setOpenedChangePassword(true)}>Change Your Password</Button>
                                </Group>
                            </li>
                        </ul>
                        <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">Other
                        </div>
                        <ul className="list-inline">
                            <li className="list-inline-item d-block border-bottom me-0">
                                <Link className="pt-2 pb-2 d-flex align-items-center" to="/notification">
                                    <i className="btn-round-md bg-gold-gradiant text-white feather-bell font-md me-3">
                                    </i>
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Notification
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3">
                                    </i>
                                </Link>
                            </li>
                            <li className="list-inline-item d-block border-bottom me-0">
                                <Link to="/helpbox" className="pt-2 pb-2 d-flex align-items-center">
                                    <i className="btn-round-md bg-primary-gradiant text-white feather-help-circle font-md me-3">
                                    </i>
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Help
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3">
                                    </i>
                                </Link>
                            </li>
                            <li className="list-inline-item d-block me-0">
                                <Link onClick={logout} className="pt-2 pb-2 d-flex align-items-center">
                                    <i className="btn-round-md bg-red-gradiant text-white feather-lock font-md me-3">
                                    </i>
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">Logout
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3">
                                    </i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Settings;
