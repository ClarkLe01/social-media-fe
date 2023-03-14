import React, { useState, useRef } from 'react';
import { Modal, Button } from '@mantine/core';
import FacebookEmoji from '@common/components/react-facebook-emoji';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { init } from 'emoji-mart';
init({ data });

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
            <div className="d-flex">
                <FacebookEmoji type="like" size="sm" />
                <FacebookEmoji type="love" size="sm" />
                <FacebookEmoji type="yay" size="sm" />
                <FacebookEmoji type="haha" size="sm" />
                <FacebookEmoji type="wow" size="sm" />
                <FacebookEmoji type="sad" size="sm" />
                <FacebookEmoji type="angry" size="sm" />
            </div>
            <Picker data={data} custom={custom} />
            <em-emoji id="+1" size="2em"></em-emoji>
            <em-emoji id="+1" skin="2"></em-emoji>
            <em-emoji shortcodes=":+1::skin-tone-1:"></em-emoji>
            <em-emoji shortcodes=":+1::skin-tone-2:"></em-emoji>
            <SliderModal
                slides={[
                    {
                        image: 'slide1.jpg',
                        title: 'Slide 1',
                        description: 'This is slide 1',
                    },
                    {
                        image: 'slide2.jpg',
                        title: 'Slide 2',
                        description: 'This is slide 2',
                    },
                    {
                        image: 'slide3.jpg',
                        title: 'Slide 3',
                        description: 'This is slide 3',
                    },
                ]}
            />
            ,
        </div>
    );
}
export default TestPage;
