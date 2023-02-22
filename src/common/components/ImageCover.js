import React from 'react';

function ImageCover(props) {
    const { className, url } = props;
    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${url})`,
            }}
        ></div>
    );
}

export default ImageCover;