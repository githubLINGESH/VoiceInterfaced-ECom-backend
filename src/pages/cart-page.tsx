import React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ProdTem from "../components/productTem";
import SideNavbar from "../components/sidenavbar";
import VoiceInterface from "../components/voiceInterface/voiceInterface";
import Userinfo from "components/userinfo";
import Footer from "components/Footer";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);
  const [IsClicked, setIsClicked] = useState(false);

  // Function to fetch cart products
  const getCartProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/getcart-products`, {
        method: "GET",
        credentials: "include"
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

  useEffect(() => {
    getCartProducts(); // Fetch cart products on mount
  }, []);

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
    SetVoiceInterfaceOpen(!OpenVoice);
  };

  // Handle profile click
  const handleProfileClick = () => {
    setIsClicked(!IsClicked);
  };

  // Handle product deletion
  const handleDeleteProduct = () => {
    getCartProducts(); // Refresh cart after product is deleted
  };

  if (!cartProducts.length) {
    return <div>No products found</div>;
  }

  return (
    <div className="relative bg-white w-full h-[1024px] text-left text-base text-darkslategray-100 font-sora">
      <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick} />
      {isSidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeSidebar} />
      )}
      <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
      {IsClicked && <Userinfo onClose={handleProfileClick} />}
      <VoiceInterface isVoice={OpenVoice} />
      {OpenVoice && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleVoiceOption}></div>}
      <b className="mt-20 px-4 inline-block text-[35px] text-black">Shopping cart</b>
      <div className="px-4">
        <div className="py-2 px-2 grid grid-cols-1 md:grid-cols-2 box-border h-px border-t-[1px] border-solid border-black">
          {cartProducts.map((product) => (
            <ProdTem key={product.id} product={product} onDelete={handleDeleteProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
