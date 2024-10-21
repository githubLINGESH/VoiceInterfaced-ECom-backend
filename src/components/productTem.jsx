import React from 'react';
import CopyToClipboard from './clipboard';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ProdTem = ({ product, onDelete }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${product.id}`, { state: { product } });
        console.log("In tem", product); // Redirect to /desktop-3 with the product ID and product details
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/deleteProduct/${product.id}`, {
                withCredentials: true
            });
            console.log(response.data); // Handle the response
            onDelete(); // Call the onDelete function to refresh the cart in the parent
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 px-4 py-8 bg-whitesmoke-100 m-4">
                <div className="m-2 flex flex-col items-center bg-white">
                    <img
                        src={product.imageSrc}
                        alt={product.name}
                        onClick={handleProductClick}
                        className="max-w-full"
                    />
                    <h2 className="px-2 text-md font-bold mt-2">{product.store}</h2>
                </div>

                <div className="m-2 flex flex-col justify-between w-full">
                    <div className="grid grid-cols-4">
                        <div className="grid col-span-3">
                            <h2 className="text-md">{product.name}</h2>
                        </div>
                        <div className="grid col-span-1 cursor-pointer flex flex-col items-center space-y-2">
                            <CopyToClipboard text={product.link} copyIcon="/pixelarticonscopy.svg" />
                            <a href={`tg://msg_url?url=${encodeURIComponent(product.link)}`}>
                                <img className="max-w-full overflow-hidden max-h-full" alt="" src="/telegram-icon.svg" />
                            </a>
                            <a href={`whatsapp://send?text=${product.link}`}>
                                <img className="max-w-full overflow-hidden max-h-full" alt="" src="/whatsapp-icon.svg" />
                            </a>
                        </div>
                        <span>₹{product.price}</span>
                    </div>
                    <div className="-m-2 flex items-center mt-4 space-x-0">
                        <a style={{ textDecoration: "none" }} href={product.link}>
                            <button className="cursor-pointer flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded border-t border-r border-b border-l border-black">
                                <span className="text-darkslategray-100 text-xl">Shop Now</span>
                                <img src="/vector11.svg" alt="Shop now" className="w-4 h-4" />
                            </button>
                        </a>
                        <button
                            className="cursor-pointer flex items-center justify-center space-x-2 bg-red text-white px-4 py-2 rounded border-l border-t border-r border-b border-whitesmoke-100"
                            onClick={handleDeleteProduct}
                        >
                            <span className="text-whitesmoke-100 text-xl">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdTem;
