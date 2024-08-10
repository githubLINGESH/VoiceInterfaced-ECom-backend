import React, { FunctionComponent, useState } from "react";
import Navbar from "components/navbar";
import SideNavbar from "components/sidenavbar";
import Userinfo from "components/userinfo";
import VoiceInterface from "components/voiceInterface/voiceInterface";
import axios from 'axios';

const AddProducts: FunctionComponent = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);
    const [IsClicked, setIsClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const closeSidebar = () => {
        setIsSidebarVisible(false);
    };

    const handleVoiceOption = () => {
        SetVoiceInterfaceOpen(!OpenVoice);
    }

    const handleProfileClick = () => {
        setIsClicked(!IsClicked);
    }

    const handleSelectOption = (selectedOption: string | null) => {
        setSelectedOption(selectedOption);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3001/prod/Add-products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('Products added successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error adding products');
        }
    };

    return (
        <div className="font-sora">
            <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick} />
            {isSidebarVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeSidebar}
                />
            )}
            <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
            {IsClicked && <Userinfo onClose={handleProfileClick} />}
            <VoiceInterface isVoice={OpenVoice} />
            {OpenVoice && <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleVoiceOption}>
            </div>}

            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-1/2 p-4 border rounded shadow-md bg-white mt-20">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Upload Products JSON File
                        </label>
                        <input type="file" accept=".json" onChange={handleFileChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer focus:outline-none" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-darkslategray-100 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add Products
                        </button>
                    </div>
                </form>
                </div>
        </div>
    );
}

export default AddProducts;