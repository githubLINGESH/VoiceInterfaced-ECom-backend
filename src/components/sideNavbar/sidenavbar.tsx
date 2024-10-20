import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './sidenavbar.css'; // Import the CSS file

interface SideNavbarProps {
    onSelect: (option: string | null) => void;
    isVisible: boolean;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ onSelect, isVisible }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
        <div className="side-navbar">
            <button
                className="close-btn"
                onClick={() => onSelect(null)}
            >
                <FontAwesomeIcon icon={faClose} />
            </button>
            <div className='menu-container'>
                <ul className="menu-list">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`menu-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => {
                                onSelect(item);
                                setActiveIndex(index);
                            }}
                        >
                            {activeIndex === index && (
                                <div className='active-bar'></div>
                            )}
                            <a className="menu-link">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideNavbar;
