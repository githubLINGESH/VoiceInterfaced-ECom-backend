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
    <div className="relative w-full h-auto">
      {/* Main Navbar */}
      <div className="bg-darkslategray-100 shadow-lg flex justify-between items-center px-4 md:px-12 py-4">
        {/* Logo */}
        <img
          className="h-12 w-auto cursor-pointer"
          src="/plugin-icon--1-1-1@2x.png"
          alt="Logo"
        />

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-1/3 relative">
          <input
            type="text"
            className="w-full p-2 rounded-l-lg border-none outline-none"
            placeholder="Search items"
          />
          <button className="bg-whitesmoke-100 p-2 rounded-r-lg">
            <img
              className="h-6 w-6"
              src="/vector1.svg"
              alt="Search"
            />
          </button>
        </div>

        {/* Cart and Help Links */}
        <div className="flex space-x-4">
          <div
            className="text-white cursor-pointer"
            onClick={handleCartClick}
          >
            CART
          </div>

          <div
            className="text-white cursor-pointer"
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
          <div className="text-white cursor-pointer">User</div>
        </div>
      </div>

      {/* Secondary Navbar (Terms, About, etc.) */}
      <div className="bg-silver py-3 flex justify-around text-center text-black text-sm">
        <div className="cursor-pointer">About</div>
        <div className="cursor-pointer">Terms of Use</div>
        <div className="cursor-pointer">Disclaimer</div>
        <div className="cursor-pointer">Affiliate Disclosure</div>
      </div>
    </div>
  );
}
