import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Switch } from '@mui/material';

interface NavbarProps {
    toggleSidebar: () => void;
    handleVoiceOption: () => void;
    handleProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, handleVoiceOption, handleProfileClick }) => {
    const navigate = useNavigate();

    function handleHelpClick() {
        navigate('/about');
    }

    function handleCartClick() {
        navigate('/cart');
    }

    const [searchTerm, setSearchTerm] = useState('');

    const [checked, setChecked] = useState(false);
    const handleToggle = () => {
        setChecked(!checked);
        checked ? navigate('/home') : navigate('/voice-com');
      };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };


    return (
        <div className="flex flex-wrap items-center w-full bg-darkslategray-100 h-16 sm:h-20 font-inter text-white text-xs sm:text-sm fixed z-50">
            <div className="ml-2 sm:ml-4">
                <img
                    className='w-6 h-6 sm:w-10 sm:h-10 cursor-pointer'
                    src="/icon.png"
                    onClick={toggleSidebar}
                    alt="menu icon"
                />
            </div>

            <div className="flex items-center justify-center w-1/6 sm:w-1/12 md:w-1/12 px-2 sm:px-4">
                {/* <img
                    className="w-16 h-auto"
                    alt="plugin icon"
                    src="/plugin-icon--1-1-1@2x.png"
                /> */}
                <div className="border rounded-xl">
                    <p className="text-6xl font-bold font-inter text-whitesmoke-100 ">V - COM</p>
                </div>
            </div>

            <div className="hidden sm:flex items-center justify-center w-2/4 sm:w-5/12 md:w-4/12 px-2 sm:px-4">
                <form onSubmit={handleSearchSubmit} className="flex w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-grow rounded-l bg-white shadow-[2px_4px_4px_1px_rgba(0,_0,_0,_0.25)_inset] box-border h-auto border-l border-solid border-darkslategray-100 text-xs sm:text-base text-darkslategray-100 font-inter"
                        placeholder="search items"
                    />
                    <button type="submit" className="flex items-center justify-center rounded-r bg-whitesmoke-100 p-1 sm:p-2">
                        <img
                            className="w-4 h-4 sm:w-6 sm:h-6"
                            alt="search icon"
                            src="/vector1.svg"
                        />
                    </button>
                </form>
            </div>

            <div className="flex items-center justify-center w-1/8 sm:w-1/12 md:w-1/12">
                <div className="cursor-pointer flex flex-col items-center" onClick={handleCartClick}>
                    <img
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        alt="cart icon"
                        src="/vector.svg"
                    />
                </div>
            </div>

            <div className="flex items-center justify-center w-1/8 sm:w-1/12 md:w-1/12">
                <div className="cursor-pointer flex flex-col items-center" onClick={handleHelpClick}>
                    <img
                        className="w-4 h-4 sm:w-7 sm:h-7"
                        alt="help icon"
                        src="/vector2.svg"
                    />
                </div>
            </div>

            <div className="w-1/8 sm:w-1/12 md:w-1/12 flex justify-center">
                <button
                    className='bg-darkslategray-100 cursor-pointer text-white rounded-full p-1 sm:p-2'
                    onClick={handleVoiceOption}>
                    🔉
                </button>
            </div>

            <div className="ml-auto flex items-center justify-end">
                {/* Full profile info for medium and larger screens */}
                <div className="hidden md:flex items-center px-2 rounded-full bg-white cursor-pointer"
                    onClick={handleProfileClick}>
                    <h2 className="text-center text-darkslategray-100 md:text-xs sm:text-sm">user</h2>
                    <img
                        className="w-6 h-6 ml-2"
                        alt="profile icon"
                        src="/vector3.svg"
                    />
                </div>

                <Switch
                    checked={checked}
                    onChange={handleToggle}
                />
                {/* Smaller icon-only profile for small screens */}
                <div className="flex md:hidden items-center px-2 py-2 rounded-full bg-white cursor-pointer"
                    onClick={handleProfileClick}>
                    <img
                        className="w-6 h-6"
                        alt="profile icon"
                        src="/vector3.svg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
