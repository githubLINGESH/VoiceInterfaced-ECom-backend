import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'components/navbar/navbar';
import SideNavbar from 'components/sideNavbar/sidenavbar';
import Userinfo from 'components/userinfo';
import VoiceInterface from 'components/voiceInterface/voiceInterface';
import ProductCard from 'components/prodCard';
import io  from 'socket.io-client';

type Product = {
    id: number;
    name: string;
    imageSrc: string;
    store: string;
    price: number;
    d_price: number;
    discount: number;
    description: string;
    link: string;
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const searchTerm = query.get('query');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);
    const [IsClicked, setIsClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [SelectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prod/search?query=${searchTerm}`);
                setSearchResults(response.data.products);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchInitialData();


        try{
            const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
            socket.on('connect', () => {
                console.log('Connected to server');
            });

            socket.on('searchResults', (products: Product[]) => {
                setSearchResults(products);
                console.log("Here are some products", products);
            });
    
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
    
            return () => {
                socket.disconnect();
            };
        }
        catch(error){
            console.log("The Error:",error);
        }
    }, [searchTerm]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const closeSidebar = () => {
        setIsSidebarVisible(false);
    };

    const handleVoiceOption = () => {
        SetVoiceInterfaceOpen(!OpenVoice);
    };

    const handleProfileClick = () => {
        setIsClicked(!IsClicked);
    };

    const handleSelectOption = (selectedOption: string | null) => {
        setSelectedOption(selectedOption);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        navigate(`/product/${product.id}`,{state:{product}});
    };

      // handling add to cart click
    const handleAddToCartClick = (product : Product) => {
        setSelectedProduct(product);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add-to-cart`,{
        method: "POST",
        headers:{
            "Content-type" : "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({products : product})

        }).then((response) =>{
        if(response.ok){
            console.log("Added Successfully");
            navigate("/cart/");
        }
        });
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
                <div className="mt-20">
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
                        {searchResults.map((product : Product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onProductClick={handleProductClick}
                            onAddToCartClick={handleAddToCartClick}
                        />
                        ))}
                    </div>
                    ): (
                        <p>No products Found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
