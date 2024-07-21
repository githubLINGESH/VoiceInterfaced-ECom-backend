import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductTemplate from "../components/ProductTemplate";
import Navbar from "../components/navbar";
import ProductCard from "../components/prodCard";
import ProdTem from "../components/productTem";
import SideNavbar from "../components/sidenavbar";
import Slider from "../components/slider/slider";
import VoiceInterface from "../components/voiceInterface/voiceInterface";
import Userinfo from "components/userinfo";
import Products from "../productData";
import React from "react";


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

const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userId, setUserId] = useState<any>();
  const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);
  const [IsClicked, setIsClicked] = useState(false);
  const [SelectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');


  const getCred = async() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-check`,
      {
        method:"GET",
        credentials: 'include',
      }).then(response => {
        if(response.ok){
          const UserIdd = response.json();
          setUserId(UserIdd);
        }
        else{
          console.log("Some error", response);
        }
    })
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/prod/products`);
        console.log("fetched");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
        setProducts(data);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  
  //handling product selection for product view

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`,{state:{product}});
  };

  // Handling product selection in side navbar

  const handleSelectOption = (option: string | null) => {
    setSelectedOption(option as any);
    setIsSidebarVisible(false);
  };

  // handling add to cart click
  const handleAddToCartClick = (product : Product) => {
    setSelectedProduct(product);
    getCred();
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

  //voice interface handling
  const handleVoiceOption = () => {
    SetVoiceInterfaceOpen(!OpenVoice);
  }

  //side Navbar handling
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  //handling profile click

  const handleProfileClick = () =>{
      setIsClicked(!IsClicked);
  };

  //passing the carted added 

  return (
    <div className="bg-white w-full text-left text-base text-darkslategray-100 font-sora">
      <Navbar toggleSidebar={toggleSidebar} handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick}/>
      {isSidebarVisible && ( // if true visible
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <div className="relative">
          {/* If isVisible true only Side navbar visible*/}
          <SideNavbar onSelect={handleSelectOption} isVisible={isSidebarVisible} />
          {IsClicked && <Userinfo onClose={handleProfileClick}/>}
          <div className="py-10" style={{ overflow: 'hidden', width: '100%', height: '700px' }}>
            <div className="slider-inner-container">
              <div className="slider-container">
                <img
                  className="m-4"
                  alt="ad 1"
                  src="/ads.png"
                />
              </div>
              <div className="slider-container">
                <img
                  className="m-4"
                  alt="ad 2"
                  src="/ads.png"
                />
              </div>
              <div className="slider-container">
                <img
                  className="m-4"
                  alt="ad 3"
                  src="/ads.png"
                />
              </div>
              <div className="slider-container">
                <img
                  className="m-4"
                  alt="ad 4"
                  src="/ads.png"
                />
              </div>
          </div>
          </div>
          <div className="px-4 py-2">
            <Slider />
          </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onAddToCartClick={handleAddToCartClick}
          />
        ))}
      </div>
      
      <VoiceInterface isVoice={OpenVoice} />
      {OpenVoice &&<div
          className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleVoiceOption}>
      </div>}

      {SelectedProduct && (
        <ProductTemplate product={SelectedProduct} />
        )}

      {Products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <div
            className="cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
          </div>
          </Link>
        ))}


          {SelectedProduct && (
              <ProdTem product={SelectedProduct} />
              )}

        {Products.map((product) => (
        <Link to={"/cart"} key={product.id}>
          <div
            className="cursor-pointer"
            onClick={() => handleAddToCartClick(product)}
          >
          </div>
          </Link>
        ))}

      </div>

      
      
  );
};

export default Home;
