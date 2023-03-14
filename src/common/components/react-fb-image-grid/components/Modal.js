import React, { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

const ModalComponent = ({ images = [], index, onClose }) => {
    const [ currentImageIndex, setCurrentImageIndex ] = useState(index);

    const onMovePrevRequest = () => {
        setCurrentImageIndex((currentImageIndex + images.length - 1) % images.length);
    };

    const onMoveNextRequest = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    return (
        <Lightbox
            mainSrc={images[currentImageIndex]}
            nextSrc={images[(currentImageIndex + 1) % images.length]}
            prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
            onCloseRequest={onClose}
            onMovePrevRequest={onMovePrevRequest}
            onMoveNextRequest={onMoveNextRequest}
        />
    );
};

export default ModalComponent;
