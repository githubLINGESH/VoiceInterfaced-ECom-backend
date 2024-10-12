import React, { useEffect } from "react";
import { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";
import ProductTemplate from "../components/ProductTemplate";
import SideNavbar from "../components/sidenavbar";
import VoiceInterface from "../components/voiceInterface/voiceInterface";
import Userinfo from "components/userinfo";
import '../ProductTemplate.css';
import { Navigate } from "react-router-dom";
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
  const [checkUser, setUserId] = useState<any>(null);


  const getCred = async() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-check`,
      {
        method:"GET",
        credentials: 'include',
      }).then(response => {
        if(response.ok){
          const userId  = response.json();
          setUserId(userId);

          if(checkUser === ""){
            navigate('/login-page');
          }
        }
        else{
          console.log("Some error", response);
        }
    })
  };

  // Handling profile click
  const handleProfileClick = () => {
    setIsClicked(!IsClicked);
  };

  const handleSelectOption = (option: string | null) => {
    setSelectedOption(option as any);
    setIsSidebarVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
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
    <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-3xl text-darkslategray-100 font-sora">
      <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick} />
      {/* form div */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
      {IsClicked && <Userinfo onClose={handleProfileClick} />}
      <VoiceInterface isVoice={isVoiceOpen} />
      {isVoiceOpen && <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleVoiceOption}>
      </div>}

      <div className="m-4 py-20 flex items-center justify-center">
        <ProductTemplate product={product} />
      </div>
    </div>
  );
};

export default ProductView;
