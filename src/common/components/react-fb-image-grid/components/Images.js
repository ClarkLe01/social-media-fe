import React, { useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Modal from './Modal';
import PropTypes from 'prop-types';

const Images = ({
    images = [],
    hideOverlay = false,
    renderOverlay = () => 'Preview Image',
    overlayBackgroundColor = '#222222',
    onClickEach = null,
    countFrom = 5,
}) => {
    const [ modal, setModal ] = useState(false);
    const [ index, setIndex ] = useState(0);
    const [ conditionalRender, setConditionalRender ] = useState(false);

    if (countFrom <= 0 || countFrom > 5) {
        console.warn('countFrom is limited to 5!');
    }

    const openModal = (index) => {
        if (onClickEach) {
            return onClickEach({ src: images[index], index });
        }

        setModal(true);
        setIndex(index);
    };

    const onClose = () => {
        setModal(false);
    };

    const renderOverlayElements = (id) => {
        if (hideOverlay) {
            return null;
        }

        return [
            <div
                key={`cover-${id}`}
                className="cover slide"
                style={{ backgroundColor: overlayBackgroundColor }}
            ></div>,
            <div
                key={`cover-text-${id}`}
                className="cover-text slide animate-text"
                style={{ fontSize: '100%' }}
            >
                {renderOverlay()}
            </div>,
        ];
    };

    const renderCountOverlayElements = (more) => {
        const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);

        return [
            more && <div key="count" className="cover"></div>,
            more && (
                <div key="count-sub" className="cover-text" style={{ fontSize: '200%' }}>
                    <p>+{extra}</p>
                </div>
            ),
        ];
    };

};

Images.propTypes = {
    images: PropTypes.array.isRequired,
    hideOverlay: PropTypes.bool,
    renderOverlay: PropTypes.func,
    overlayBackgroundColor: PropTypes.string,
    onClickEach: PropTypes.func,
    countFrom: PropTypes.number,
};

export default Images;
