import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface SideNavbarProps {
    onSelect: (option: string | null) => void;
    isVisible: boolean;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ onSelect, isVisible }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // Define activeIndex state

    const menuItems = [
        'HeadPhones',
        'Electronics',
        'Laptops',
        'SmartPhones',
        'Accessories',
        'Footwear'
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed inset-y-0 left-0 bg-whitesmoke-100 z-50" style={{ width: "305px" }}>
            <button
                className="cursor-pointer absolute top-4 right-4 text-darkslategray-100"
                onClick={() => onSelect(null)} // Close sidebar
            >
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className='py-8 text-lg'>
                <ul className="list-none p-0 m-0">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className="relative px-4 py-8 cursor-pointer"
                            onClick={() => {
                                onSelect(item); // Pass the selected item back to Home
                                setActiveIndex(index); // Set the active index for styling
                            }}
                        >
                            {activeIndex === index && (
                                <div className='grid grid-cols-12 absolute inset-0 bg-silver z-0'>
                                    <div className='grid col-span-1 bg-darkslategray-100' style={{ zIndex: 1 }}></div>
                                </div>
                            )}
                            <a className="px-8 relative z-10 text-xl">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideNavbar;
