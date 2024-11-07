import React, { useEffect } from "react";
import { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "components/navbar/navbar";
import ProductTemplate from "../components/ProductTemplate";
import VoiceInterface from "../components/voiceInterface/voiceInterface";
import Userinfo from "components/userinfo";
import axios from 'axios';

type ProductView3Props = {};

const ProductView: FunctionComponent<ProductView3Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [IsClicked, setIsClicked] = useState(false);


  // Handling profile click
  const handleProfileClick = () => {
    setIsClicked(!IsClicked);
  };

  const handleSelectOption = (option: string | null) => {
    setSelectedOption(option as any);
    setIsSidebarVisible(false);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleVoiceOption = () => {
    setIsVoiceOpen(!isVoiceOpen);
  };

  // Post viewed product to backend
  useEffect(() => {
    const postViewedProduct = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/UContext/viewed-product`, {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productImageSrc: product.imageSrc
        },{
          withCredentials: true,
        });
        console.log('Product view tracked');
      } catch (error) {
        console.error('Error tracking product view:', error);
      }
    };

    if (product) {
      postViewedProduct(); // Call function to track product view
    }
  }, [product]);

  return (
    <div className="bg-white w-full text-left text-base text-darkslategray-100 font-sora">
      <Navbar handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick} />
      {IsClicked && <Userinfo onClose={handleProfileClick} />}
      <VoiceInterface isVoice={isVoiceOpen} />
      {isVoiceOpen && <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleVoiceOption}>
      </div>}

      <div className="py-20 flex items-center justify-center">
        <ProductTemplate product={product} />
      </div>
    </div>
  );
};

export default ProductView;
