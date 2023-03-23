import React, { useState, useRef } from 'react';
import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    Button,
    ActionIcon,
    Input,
    Container,
    ScrollArea,
    Checkbox,
    Badge,
} from '@mantine/core';
import { IconX, IconSearch } from '@tabler/icons-react';
import { init } from 'emoji-mart';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
init({ data });

const memberList = [
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon ',
        user: '@macale1',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir ',
        user: '@macale2',
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast ',
        user: '@macale3',
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary ',
        user: '@macale4',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        user: '@macale12',
    },
];

const custom = [
    {
        id: 'github',
        name: 'GitHub',
        emojis: [
            {
                id: 'octocat',
                name: 'Octocat',
                keywords: [ 'github' ],
                skins: [ { src: './octocat.png' } ],
            },
            {
                id: 'shipit',
                name: 'Squirrel',
                keywords: [ 'github' ],
                skins: [
                    { src: './shipit-1.png' },
                    { src: './shipit-2.png' },
                    { src: './shipit-3.png' },
                    { src: './shipit-4.png' },
                    { src: './shipit-5.png' },
                    { src: './shipit-6.png' },
                ],
            },
        ],
    },
    {
        id: 'gifs',
        name: 'GIFs',
        emojis: [
            {
                id: 'party_parrot',
                name: 'Party Parrot',
                keywords: [ 'dance', 'dancing' ],
                skins: [ { src: './party_parrot.gif' } ],
            },
        ],
    },
];

function TestPage() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ activeModal, setActiveModal ] = useState('modal1');
    const [ modal1State, setModal1State ] = useState({
        textareaContent: '',
        checkboxChecked: false,
    });
    const [ valueChecked, setValueChecked ] = useState([]);
    const [ objectChecked, setObjectChecked ] = useState([]);

    const textareaRef = useRef(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function switchModal(modalName) {
        setActiveModal(modalName);
    }

    function handleTextareaChange(event) {
        setModal1State((prevState) => ({
            ...prevState,
            textareaContent: event.target.value,
        }));
        textareaRef.current.focus();
    }

    function handleCheckboxChange(event) {
        setModal1State((prevState) => ({
            ...prevState,
            checkboxChecked: event.target.checked,
        }));
    }

    function ModalContent1() {
        return (
            <div>
                <h2>Modal 1</h2>
                <textarea
                    value={modal1State.textareaContent}
                    onChange={handleTextareaChange}
                    ref={textareaRef}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={modal1State.checkboxChecked}
                        onChange={handleCheckboxChange}
                        autoFocus={true}
                    />
                    Checkbox
                </label>
            </div>
        );
    }

    function ModalContent2(props) {
        return (
            <div>
                <h2>Modal 2</h2>
                <p>Textarea content from Modal 1: {props.modal1State.textareaContent}</p>
                <p>Checkbox checked from Modal 1: {props.modal1State.checkboxChecked.toString()}</p>
            </div>
        );
    }

    function SliderModal(props) {
        const [ currentSlide, setCurrentSlide ] = useState(0);
        const totalSlides = props.slides.length;

        const goToNextSlide = () => {
            setCurrentSlide((currentSlide + 1) % totalSlides);
        };

        const goToPrevSlide = () => {
            setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
        };

        return (
            <div className="slider-modal">
                <div className="slider">
                    {props.slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide${index === currentSlide ? ' active' : ''}`}
                        >
                            <img src={slide.image} alt={slide.title} />
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={goToPrevSlide}>
                    &lt;
                </button>
                <button className="next" onClick={goToNextSlide}>
                    &gt;
                </button>
            </div>
        );
    }

    function handleCheckBox(value) {
        setValueChecked(value);
        console.log(valueChecked);
    }

    function MemberBadge(props) {
        const value = props.value;
        const checkedMember = memberList.find((o) => o.user === value);
        const handleClick = () => {
            props.onClick(props.index);
        };
        return (
            <Badge
                variant="outline"
                color="cyan"
                radius="sm"
                size="xl"
                classNames={{
                    root: 'mx-1 mb-1 p-0 px-2',
                }}
                leftSection={
                    <Avatar src={`assets/images/${checkedMember.imageUrl}`} size={22} radius="xl">
                        BH
                    </Avatar>
                }
                rightSection={
                    <ActionIcon variant="transparent" radius="xl" size="xs" color="cyan" onClick={handleClick}>
                        <IconX size={12} />
                    </ActionIcon>
                }
            >
                <Text size={10} color="dark">
                    {checkedMember.name}
                </Text>
            </Badge>
        );
    }

    function handleMemberBadgeClick(index){
        const updatedItems = [ ...valueChecked ];
        updatedItems.splice(index, 1);
        setValueChecked(updatedItems);
    }
    

    return (
        <div>
            {/* <Button onClick={openModal}>Open Modal</Button>

            <Modal
                opened={isOpen}
                onClose={closeModal}
                title={activeModal === 'modal1' ? 'Modal 1' : 'Modal 2'}
                size="md"
            >
                {activeModal === 'modal1' ? (
                    <ModalContent1 />
                ) : (
                    <ModalContent2 modal1State={modal1State} />
                )}

                <div style={{ marginTop: '1rem' }}>
                    <Button variant="light" onClick={() => switchModal('modal1')}>
                        Switch to Modal 1
                    </Button>
                    <Button variant="light" onClick={() => switchModal('modal2')}>
                        Switch to Modal 2
                    </Button>
                    <Button onClick={closeModal}>Close Modal</Button>
                </div>
            </Modal> */}
            <Container size="xs" px="xs">
                <div className="input-search">
                    <Input
                        icon={<IconSearch size={13} />}
                        placehodler="Search for a friend or list…"
                        size="xs"
                        radius="xl"
                    />
                </div>
                <ScrollArea style={{ height: 270 }}>
                    <Checkbox.Group
                        label="Select your favorite framework/library"
                        description="This is anonymous"
                        value={valueChecked}
                        onChange={handleCheckBox}
                        orientation="vertical"
                    >
                        <Group className="">
                            {memberList.map((member, id) => (
                                <Button
                                    key={member.user}
                                    fullWidth
                                    size="xl"
                                    leftIcon={
                                        <Avatar
                                            src={`assets/images/${member.imageUrl}`}
                                            alt="it's me"
                                            radius="xl"
                                        />
                                    }
                                    variant="outline"
                                    classNames={{
                                        inner: 'justify-content-start',
                                        root: 'px-0 ps-1',
                                        label: 'flex-fill',
                                    }}
                                >
                                    <Checkbox
                                        value={member.user}
                                        label={member.name}
                                        labelPosition="left"
                                        color="red"
                                        radius="xl"
                                        indeterminate
                                        classNames={{
                                            inner: 'mt-2',
                                            root: 'flex-fill',
                                            body: 'flex-fill pe-3 align-items-center',
                                            labelWrapper: 'me-auto',
                                        }}
                                    />
                                </Button>
                            ))}
                        </Group>
                    </Checkbox.Group>
                </ScrollArea>
                {valueChecked.length > 0 && (
                    <div className="pt-2 mt-4 border border-2">
                        {valueChecked.map((value, id) => (
                            <MemberBadge value={value} key={id} onClick={handleMemberBadgeClick} />
                        ))}
                    </div>
                )}
            </Container>

            {/* <Picker data={data} custom={custom} />
            <em-emoji id="+1" size="2em"></em-emoji>
            <em-emoji id="+1" skin="2"></em-emoji>
            <em-emoji shortcodes=":+1::skin-tone-1:"></em-emoji>
            <em-emoji shortcodes=":+1::skin-tone-2:"></em-emoji> */}
        </div>
    );
}
export default TestPage;
