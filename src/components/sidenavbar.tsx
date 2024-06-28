import React, { useState } from 'react';

    interface SideNavbarProps {
        onSelect: (option: string | null) => void;
        isVisible: boolean;
    }

const SideNavbar: React.FC<SideNavbarProps> = ({ onSelect, isVisible }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        'Home, Kitchen',
        'Electronics',
        'Mobiles, Computers',
        'TV, Appliances',
        'Sports, Fitness'
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed inset-y-0 left-0 bg-whitesmoke-100 z-50" style={{width:"305px"}}>
        <button
            className="cursor-pointer absolute top-4 right-4 text-darkslategray-100"
            onClick={onSelect.bind(null, null)}
        >
            X
        </button>
        <div className='py-8 text-lg'>
            <ul className="list-none p-0 m-0">
            {menuItems.map((item, index) => (
                <li
                key={index}
                className="relative px-4 py-8 cursor-pointer"
                onClick={() => setActiveIndex(index)}
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
