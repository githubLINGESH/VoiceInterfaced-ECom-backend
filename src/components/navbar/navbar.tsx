import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Switch } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faQuestionCircle, faVolumeUp, faUser, faSearch, faNavicon} from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

interface NavbarProps {
    // toggleSidebar: () => void;
    handleVoiceOption: () => void;
    handleProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleVoiceOption, handleProfileClick }) => {
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
        <div className="navbar-container">
            {/* Sidebar Toggle Icon */}
            {/* <div className="navbar-icon cursor-pointer text-2xl md:text-3xl" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faNavicon} />
            </div> */}

            {/* Logo */}
            <div className="navbar-logo">
                <img
                    className="plugin-icon" // Adjust icon size based on screen size
                    alt="plugin icon"
                    src="plugin-icon--1-1-1_2x-removebg-preview.png"
                />
            </div>

            <div className="navbar-search">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                        placeholder="Search items"
                    />
                    <button type="submit" className="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>

            <div className="navbar-item" onClick={handleCartClick}>
                <FontAwesomeIcon icon={faCartShopping} className="navbar-icon-item" />
            </div>

            <div className="navbar-item" onClick={handleHelpClick}>
                <FontAwesomeIcon icon={faQuestionCircle} className="navbar-icon-item" />
            </div>

            <div className="navbar-item" onClick={handleVoiceOption}>
                <FontAwesomeIcon icon={faVolumeUp} className="navbar-icon-item" />
            </div>

            <div className="navbar-profile">
                <div className="profile-md" onClick={handleProfileClick}>
                    <h2 className="profile-name">User</h2>
                    <FontAwesomeIcon icon={faUser} className="profile-icon" />
                </div>

                <Switch checked={checked} onChange={handleToggle} />

                <div className="profile-sm" onClick={handleProfileClick}>
                    <FontAwesomeIcon icon={faUser} className="profile-icon" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
