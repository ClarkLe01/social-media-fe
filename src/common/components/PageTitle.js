import React from 'react';
import { Text, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function Pagetitle(props) {
    const { title, inputSearch, setInputSearch } = props;
    return (
        <div className="card shadow-xss w-100 d-block d-flex border-0 p-2 mb-1">
            <Text className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">
                {title}
                <div className="pt-0 pb-0 ms-auto">
                    <div className="search-form-2 ms-2">
                        <Input
                            icon={<IconSearch size={12} />}
                            placeholder="Search Messenger"
                            radius="xl"
                            size="xs"
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                        />
                    </div>
                </div>
            </Text>
        </div>
    );
}

export default Pagetitle;
