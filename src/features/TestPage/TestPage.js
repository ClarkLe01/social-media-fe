import React, { useState, useRef } from 'react';
import { Modal, Button } from '@mantine/core';

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
                <textarea value={modal1State.textareaContent} onChange={handleTextareaChange} ref={textareaRef} />
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

    return (
        <div>
            <Button onClick={openModal}>Open Modal</Button>

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
            </Modal>
        </div>
    );
}
export default TestPage;