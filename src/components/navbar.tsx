import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
    toggleSidebar: () => void;
    handleVoiceOption : () => void;
    handleProfileClick : () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, handleVoiceOption, handleProfileClick }) => {
    const navigate = useNavigate();

    function handleHelpClick() {
        navigate('/desktop-4');
    }

    function handleCartClick() {
        navigate('/cart');
    }


    return (
        <div className="flex flex-wrap items-center w-full bg-darkslategray-100 h-20 font-inter text-white text-sm fixed z-50">
            <div className="ml-4">
                <img
                    className='w-10 h-10'
                    src="/icon.png"
                    onClick={toggleSidebar}>
                </img>
            </div>

            <div className="flex items-center justify-center w-1/4 sm:w-1/12 md:w-1/12 px-4">
                <img
                    className="w-full h-auto"
                    alt="plugin icon"
                    src="/plugin-icon--1-1-1@2x.png"
                />
            </div>

            <div className="flex items-center justify-center w-2/4 sm:w-5/12 md:w-4/12">
                <div className="flex w-full">
                    <input
                        type="text"
                        className="flex-grow rounded-l bg-white shadow-[2px_4px_4px_1px_rgba(0,_0,_0,_0.25)_inset] box-border h-auto border-l border-solid border-darkslategray-100 text-base text-darkslategray-100 font-inter"
                        placeholder="search items"
                    />
                    <div className="flex items-center justify-center rounded-r bg-whitesmoke-100 p-2">
                        <img
                            className="w-6 h-6"
                            alt="search icon"
                            src="/vector1.svg"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center w-1/4 sm:w-1/12 md:w-1/12">
                <div className="cursor-pointer flex flex-col items-center" onClick={handleCartClick}>
                    <img
                        className="w-6 h-6"
                        alt="cart icon"
                        src="/vector.svg"
                    />
                    <span className="hidden md:inline">CART</span>
                </div>
            </div>

            <div className="flex items-center justify-center w-1/4 sm:w-1/12 md:w-1/12">
                <div className="cursor-pointer flex flex-col items-center" onClick={handleHelpClick}>
                    <img
                        className="w-7 h-7"
                        alt="help icon"
                        src="/vector2.svg"
                    />
                    <span className="hidden md:inline">HELP</span>
                </div>
            </div>

            <div className="">
                <button
                    className='bg-darkslategray-100 cursor-pointer'
                    onClick={handleVoiceOption}>
                        🔉
                </button>
            </div>

            <div className="ml-auto flex items-center justify-end">
                {/* Full profile info for medium and larger screens */}
                <div className="hidden md:flex items-center px-2 rounded-full bg-white cursor-pointer"
                    onClick={handleProfileClick}>
                    <h2 className="text-center text-darkslategray-100">user</h2>
                    <img
                        className="w-7 ml-2"
                        alt="profile icon"
                        src="/vector3.svg"
                    />
                </div>
                {/* Smaller icon-only profile for small screens */}
                <div className="flex md:hidden items-center px-2 py-2 rounded-full bg-white cursor-pointer"
                onClick={handleProfileClick}>
                    <img
                        className="w-7"
                        alt="profile icon"
                        src="/vector3.svg"
                    />
                </div>
            </div>
        </div>


    );
};

export default Navbar;
