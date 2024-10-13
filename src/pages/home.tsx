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
import Footer from "components/Footer";
import VideoPopup from "components/videoPopup/videoPopup";


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
  const [showVideoPopup, setShowVideoPopup] = useState(false);


  useEffect(() => {
    const getCred = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-check`, {
          method: "GET",
          credentials: 'include',
        });
  
        if (response.ok) {
          const { userId: UserIdd } = await response.json(); // Destructure userId from the response
  
          setUserId(UserIdd);
          console.log("Home page", UserIdd);
  
          // Check if userId is null, undefined, or empty (better validation)
          if (!UserIdd) {
            navigate('/login-page'); // Redirect to login page if userId is invalid
          }
        } else {
          console.log("Some error", response);
        }
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };
  
    getCred();
  }, [navigate]); // Make sure 'navigate' is included in the dependency array
  

  useEffect(() => {
    const handleExitIntent = (event: MouseEvent) => {
      if (event.clientY < 10) {
        setShowVideoPopup(true); // Show the popup when mouse is near the top
      }
    };

    document.addEventListener("mouseout", handleExitIntent);
    return () => {
      document.removeEventListener("mouseout", handleExitIntent);
    };
  }, []);

  const handleClosePopup = () => {
    setShowVideoPopup(false); // Close the video popup
  };
  

  useEffect(() => {
    const fetchProducts = async (category?: string) => {
      try {
        const categoryParam = category ? `?category=${category}` : ''; // Add category if selected
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/prod/products${categoryParam}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Fetch all products by default
  }, []);

  useEffect(() => {
    if (selectedOption) {
      console.log("Selected Option", selectedOption);
      const fetchProductsByCategory = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/prod/products?category=${selectedOption}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products by category:", error);
        }
      };
      fetchProductsByCategory();
    }
  }, [selectedOption]); // Fetch products when category is selected

  
  //handling product selection for product view

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    // Optional: add a brief highlight effect
    document.getElementById(`product-${product.id}`)?.classList.add('highlight');
    setTimeout(() => {
      document.getElementById(`product-${product.id}`)?.classList.remove('highlight');
    }, 500);
    navigate(`/product/${product.id}`, { state: { product } });
  };
  

  // Handling product selection in side navbar

  const handleSelectOption = (option: string | null) => {
    //console.log("Option clicked",option);
    setSelectedOption(option as any);
    setIsSidebarVisible(false);
  };

  const scrollToProductSection = () => {
    const productSection = document.getElementById("product-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Call this function after fetching products
  useEffect(() => {
    if (products.length > 0 && selectedOption!= '') {
      scrollToProductSection();
    }
  }, [products]);
  

  // handling add to cart click
  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ products: product }),
    }).then((response) => {
      if (response.ok) {
        console.log("Added Successfully");
  
        // Safely access the element using optional chaining
        const addToCartButton = document.getElementById(`add-to-cart-${product.id}`);
        if (addToCartButton) {
          addToCartButton.innerText = 'Added!';
          
          setTimeout(() => {
            addToCartButton.innerText = 'Add to Cart';
          }, 2000);
        }
  
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

  // Handle product deletion
  const handleDeleteProduct = () => {
    //getCartProducts(); // Refresh cart after product is deleted
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array(10).fill(0).map((_, index) => (
        <div key={index} className="w-full h-48 bg-gray-300 animate-pulse" />
      ))}
    </div>
  );

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
          <VideoPopup show={showVideoPopup} onClose={handleClosePopup} />
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


      {products.length === 0 ? <SkeletonLoader /> : (
      <div id="product-section" className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onAddToCartClick={handleAddToCartClick}
          />
        ))}
        </div>
      )}
      
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
              <ProdTem product={SelectedProduct} onDelete={handleDeleteProduct}/>
              )}

        {Products.map((product) => (
        <Link to={"/cart"} key={product.id}>
          <div
            id={`add-to-cart-${product.id}`}
            className="cursor-pointer"
            onClick={() => handleAddToCartClick(product)}
          >
          </div>
          </Link>
        ))}

        <Footer/>

      </div>

      
  );
};

export default Home;
