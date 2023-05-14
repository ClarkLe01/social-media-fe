import React, { useState } from 'react';
import { useDisclosure  } from '@mantine/hooks';
import { Button, Modal, Group, Divider } from '@mantine/core';
import { IconUser, IconLock, IconCake, IconGenderMale } from '@tabler/icons-react';

import Input from '@common/components/Input';
import DateTimePicker from '@common/components/DatetimePicker';
import Selector from '@common/components/Selector';
import { useAuth, useProfile } from '@services/controller';

function TestPage() {

    const { profile } = useAuth();
    
    const [ openedEditProfile, setOpenedEditProfile ] = useState(false);
    const [ openedChangePassword, setOpenedChangePassword ] = useState(false);
    const { saveLoading } = useAuth();
    const { updateProfile } = useProfile(profile.data.id);
    const [ firstName, setFirstName ] = useState(profile.data.first_name);
    const [ lastName, setLastName ] = useState(profile.data.last_name);
    const [ gender, setGender ] = useState(profile.data.gender);
    const [ birthday, setBirthday ] = useState(new Date(profile.data.birthday));
    
    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmNewPassword, setConfirmNewPassword ] = useState("");

    const [ differentNewPassword, setDifferentNewPassword ] = useState(false);

    // console.log(profile.data);
    
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'nonbinary', label: 'Non-binary' },
    ];
    // test page
    const handleChangeGender = (e) => {
        setGender(e);
    };

    const dateString =  birthday.getFullYear() + "-" +
    ("0" + (birthday.getMonth()+1)).slice(-2) + "-" +
    ("0" + birthday.getDate()).slice(-2);

    const handleUpdateProfile = () => {
        const form = new FormData();
        if(firstName != "") form.append('first_name', firstName);
        if(lastName != "") form.append('last_name', lastName);
        if(gender != "") form.append('gender', gender);
        if(dateString != "") form.append('birthday', dateString);
        updateProfile({
            data: form,
        });
        setOpenedEditProfile(false);
        console.log(gender);
        console.log(profile.data.gender);
    };

    const handleChangePassword = () => {
        // if(currentPassword != profile.data.)
    };

    return (
        <React.Fragment>
            <Modal 
                opened={openedEditProfile} 
                onClose={() => setOpenedEditProfile(false)} 
                title={<div 
                    className="d-flex justify-content-center">
                    <h1 className="fw-bold mx-auto">
                        Edit Your Profile
                    </h1>
                </div>
                }
                classNames={{
                    header: 'd-flex justify-content-between',
                    title: 'flex-fill mx-auto pe-3 my-1',
                }}
            >

                <form onSubmit={handleUpdateProfile}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>
                            <Divider my="xs" label="First name" />
                            <Input
                                name="firstName"
                                icon={<IconUser />}
                                type="text"
                                placeHolder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Divider my="xs" label="Last name" />
                            <Input
                                name="lastName"
                                icon={<IconUser />}
                                type="text"
                                placeHolder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <Divider my="xs" label="Birthday" />
                    <DateTimePicker
                        name="birthday"
                        icon={<IconCake />}
                        placeHolder="Pick your birthday"
                        value={birthday}
                        onChange={e => setBirthday(e)}
                    />
                    <Divider my="xs" label="Gender" />
                    <Selector
                        name="gender"
                        icon={<IconGenderMale />}
                        placeHolder="Choose your gender"
                        options={genderOptions}
                        value={gender}
                        onChange={e => handleChangeGender(e)}
                    />
                    
                    <div className="col-sm-12 p-0 text-left">
                        <Button
                            // type="submit"
                            className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                            loading={saveLoading}
                            onClick={handleUpdateProfile}
                        >
                            {saveLoading ? 'Save...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </Modal>
            <Group position="center">
                <Button onClick={() => setOpenedEditProfile(true)}>Open centered Modal</Button>
            </Group>


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

                <form onSubmit={handleUpdateProfile}>
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
                            onClick={handleUpdateProfile}
                        >
                            {saveLoading ? 'Save...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </Modal>
            <Group position="center">
                <Button onClick={() => setOpenedChangePassword(true)}>Open centered Modal</Button>
            </Group>
        </React.Fragment>
    );
}
export default TestPage;
