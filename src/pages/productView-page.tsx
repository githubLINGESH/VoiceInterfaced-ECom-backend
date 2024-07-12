import React from 'react';
import { FunctionComponent, useState} from "react";
import Navbar from "../components/navbar";
import ProductTemplate from "../components/ProductTemplate";
import { useLocation } from 'react-router-dom';
import '../ProductTemplate.css'
import SideNavbar from "../components/sidenavbar";
import VoiceInterface from "../components/voiceInterface";


type ProductView3Props = {};

const ProductView: FunctionComponent<ProductView3Props> = () => {
  const location = useLocation();
  const {product} = location.state || {};
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedOption,setSelectedOption] = useState<string | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  console.log("Products:",product);

    const handleSelectOption = (selectedOption: string | null) => {
      setSelectedOption(selectedOption);
    };

    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };


  const handleVoiceOption = () =>{
    setIsVoiceOpen(!isVoiceOpen);
  }

  return (
    <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-3xl text-darkslategray-100 font-sora">
      <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption}/>
        {/* form div */}
        {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
      <VoiceInterface isVoice={isVoiceOpen}/>

      <div className="m-4 py-20 flex items-center justify-center">
        <ProductTemplate product={product} />
      </div>
    </div>

  );
};

export default ProductView;
