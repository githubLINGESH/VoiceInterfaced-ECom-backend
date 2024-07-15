import React from 'react';
import { FunctionComponent, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import ProdTem from "../components/productTem";
import SideNavbar from "../components/sidenavbar";
import VoiceInterface from "../components/voiceInterface";


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

type Cart2Props = {};

const Cart: FunctionComponent<Cart2Props> = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedOption,setSelectedOption] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [userId, setUSerId] = useState<any>();
  const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        // use hosted api during production - https://voiceinterfaced-ecom-backend.onrender.com/cart/getcart-products
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/getcart-products`,{
          method:"GET",
          credentials:"include"
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCartProducts(data.products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error occurred', error);
      }
    };
    getCartProducts();
  }, []);


  if (!cartProducts.length) {
    // Handle the case where no products are found
    return <div>No products found</div>;
  }


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
    SetVoiceInterfaceOpen(!OpenVoice);
  }

    // Assuming you have an array of products, you can filter the product with the matching ID
  return (
    <div className="relative bg-white w-full h-[1024px] text-left text-base text-darkslategray-100 font-sora">
        <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption}/>
        {/* form div */}
        {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
      <VoiceInterface isVoice={OpenVoice} />
      <b className="mt-20 px-4 inline-block text-[35px] text-black">
        Shopping cart
      </b>
      <div className="px-4">
      <div className="py-2 px-2 grid grid-cols-1 md:grid-cols-2 box-border h-px border-t-[1px] border-solid border-black">
        {cartProducts.map((product) => (
          <ProdTem key={product.id} product={product} />
        ))}
      </div>
      </div>
      </div>

    );
  };

export default Cart;
