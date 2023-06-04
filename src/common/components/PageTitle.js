import React from 'react';
import { Text, Input } from '@mantine/core';

function Pagetitle(props) {
    const { title } = props;
    return (
        <div className="card shadow-xss w-100 d-block d-flex border-0 p-2 mb-1">
            <Text className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">
                {title}
                <form action="#" className="pt-0 pb-0 ms-auto">
                    <div className="search-form-2 ms-2">
                        <i className="ti-search font-xss"></i>
                        <input
                            type="text"
                            className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                            placeholder="Search here."
                        />
                    </div>
                </form>
            </Text>
        </div>
    );
}

export default Pagetitle;
