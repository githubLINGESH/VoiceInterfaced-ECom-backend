import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbarr() {
  const navigate = useNavigate();

  function handleHelpClick() {
    navigate('/desktop-4');
  }

  function handleCartClick() {
    navigate('/desktop-2');
  }

  return (
    <div className="relative w-full">
      {/* Main Navbar */}
      <div className="bg-[#AB886D] shadow-lg flex justify-between items-center px-4 md:px-12 py-4">
        {/* Logo */}
        <img
          className="h-12 w-auto cursor-pointer"
          src="/plugin-icon--1-1-1_2x-removebg-preview.png"
          alt="Logo"
        />

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/3 relative">
          <input
            type="text"
            className="w-full p-2 rounded-l-lg outline-none"
            placeholder="Search items"
            style={{ backgroundColor: '#D8C3A5' }}
          />
          <button className="bg-white p-2 rounded-r-lg">
            <img
              className="h-6 w-6"
              src="/vector1.svg"
              alt="Search"
            />
          </button>
        </div>

        {/* Cart and Help Links */}
        <div className="flex space-x-6">
          <div
            className="text-white font-medium cursor-pointer hover:text-gray-200 transition duration-200"
            onClick={handleCartClick}
          >
            Cart
          </div>

          <div
            className="text-white font-medium cursor-pointer hover:text-gray-200 transition duration-200"
            onClick={handleHelpClick}
          >
            Help
          </div>
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full cursor-pointer"
            src="/vector3.svg"
            alt="User"
          />
          <div className="text-white cursor-pointer hover:text-gray-200 transition duration-200">User</div>
        </div>
      </div>

      {/* Secondary Navbar (Terms, About, etc.) */}
      <div className="bg-gray-300 py-3 flex justify-around text-center text-black text-sm">
        <div className="cursor-pointer hover:text-[#AB886D] transition duration-200">About</div>
        <div className="cursor-pointer hover:text-[#AB886D] transition duration-200">Terms of Use</div>
        <div className="cursor-pointer hover:text-[#AB886D] transition duration-200">Disclaimer</div>
        <div className="cursor-pointer hover:text-[#AB886D] transition duration-200">Affiliate Disclosure</div>
      </div>
    </div>
  );
}
