import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductTemplate from "../components/ProductTemplate";
import Navbar from "../components/navbar/navbar";
import ProductCard from "../components/prodCard";
import ProdTem from "../components/productTem";
import CategoryCarousel from "components/CategoryGrid/CategoryGrid";
import SideNavbar from "../components/sideNavbar/sidenavbar";
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

interface Category {
  name: string; 
  imageUrl: string;
  link: string;
  orientation: 'portrait' | 'landscape'; // Specify as a union type
}

interface TrendingProduct {
  id: number;
  product : Product
  imageUrl: string;
  productName: string;
}

interface LatestProduct {
  productId: number;
  product : Product
}


const categories : Category[] = [
  {
      name: 'Kitchen',
      imageUrl: '/category/kitchen-edited.jpg',
      link: '/category/kitchen',
      orientation : 'landscape'
  },
  {
      name: 'Smartphones',
      imageUrl: '/category/smartphones-edited.jpg',
      link: '/category/smartphones',
      orientation : 'portrait'
  },
  {
      name: 'Earphones',
      imageUrl: '/category/earphones-edited.jpg',
      link: '/category/earphones',
      orientation : 'landscape'
  },
  {
      name: 'Electronics',
      imageUrl: '/category/electronics-edited.jpg',
      link: '/category/electronics',
      orientation : 'landscape'
  },
  {
      name: 'Footwear',
      imageUrl: '/category/footwear-edited.jpg',
      link: '/category/footwear',
      orientation : 'landscape'
  },
];


const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To access the passed state
  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userId, setUserId] = useState<any>(location.state?.userId || null); // Get userId from state or set null
  const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);
  const [IsClicked, setIsClicked] = useState(false);
  const [SelectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([]);
  const [LatestProducts, setLatestProducts] = useState<LatestProduct[]>([]);
  const Categories = ['Headphones', 'Electronics', 'Laptops', 'Smartphones', 'Accessories', 'Footwear'];


  useEffect(() => {
    console.log("userId in client side", userId);
    if (!userId) {
      // If userId is not available, fetch it from the backend
      const getCred = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-check`, {
            method: "GET",
            credentials: 'include',
          });

          if (response.ok) {
            const { userId: fetchedUserId } = await response.json();
            setUserId(fetchedUserId);
            console.log("Home page", fetchedUserId);

            // Redirect to login if fetched userId is invalid
            if (!fetchedUserId) {
              navigate('/login-page');
            }
          } else {
            console.log("Some error", response);
          }
        } catch (error) {
          console.error("Error fetching credentials:", error);
        }
      };

      getCred();
    }
  }, [navigate, userId]); // Dependency array includes userId
  

  // Handle inactivity (no activity for 8 seconds)
  const handleUserActivity = () => {
    clearTimeout(inactivityTimer); // Reset the timer on any user action
    inactivityTimer = setTimeout(() => {
      setShowVideoPopup(true); // Show popup after 8 seconds of inactivity
    }, 80000);
  };

  // Handle exit intent (mouse moves near the top of the window)
  const handleExitIntent = (event: MouseEvent) => {
    if (event.clientY < 10 && event.clientX >1200) {
      setShowVideoPopup(true); // Show the popup when mouse is near the top
    }
  };

  let inactivityTimer: NodeJS.Timeout;


  useEffect(() => {
    // Add event listeners for inactivity and exit intent
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('scroll', handleUserActivity);
    document.addEventListener('mouseout', handleExitIntent);

    // Start inactivity timer initially
    handleUserActivity();

    // Cleanup event listeners and timer on component unmount
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('scroll', handleUserActivity);
      document.removeEventListener('mouseout', handleExitIntent);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const handleClosePopup = () => {
    setShowVideoPopup(false); // Close the video popup
  };

  // Fetch trending products from the backend
  useEffect(() => {
    const fetchTrendingProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/prod/trending-products`,{
              method: 'GET',
              credentials : 'include'
            });
            const data = await response.json();
            console.log("Trending Products", data);
            setTrendingProducts(data);
        } catch (error) {
            console.error('Error fetching trending products:', error);
        }
    };

    fetchTrendingProducts();
}, []);


  // Fetch latest products from the backend
  useEffect(() => {
    const fetchLatestProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/UContext/get-viewed-product/`,{
              method: 'GET',
              credentials : 'include'
            });
            const data = await response.json();
            console.log("Lateset Products", data);
            setLatestProducts(data);
        } catch (error) {
            console.error('Error fetching latest products:', error);
        }
    };

    fetchLatestProducts();
}, []);
  

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

  const handleCategorySelect = (categoryName: string) => {
    setSelectedOption(categoryName); // Update selected category
  };

  //passing the carted added

  return (
    <div className="bg-white w-full text-left text-base text-darkslategray-100 font-sora">
      <Navbar handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick}/>
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
          <div className="mt-10 px-4 py-8">
          <h2 className="text-center font-bold text-2xl mb-4">Trending Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
              {trendingProducts.length > 0 ? (
                 trendingProducts.map((item: TrendingProduct) => (
                  <ProductCard
                    key={item.product.id} // Assuming product has an id field
                    product={item.product} // Pass the product details
                    onProductClick={handleProductClick}
                    onAddToCartClick={handleAddToCartClick}
                  />
                ))
              ) : (
                  <p>Loading trending products...</p>
              )}
        </div>
        </div>
          <div className="py-2 mt-2">
            <CategoryCarousel categories={categories} onCategorySelect={handleCategorySelect} />
          </div>
      </div>

      <div className="mt-10 px-4 py-8">
          <h2 className="text-center font-bold text-2xl mb-4">Latest Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
              {LatestProducts.length > 0 ? (
                 LatestProducts.map((item: LatestProduct) => (
                  <ProductCard
                    key={item.productId} // Assuming product has an id field
                    product={item.product} // Pass the product details
                    onProductClick={handleProductClick}
                    onAddToCartClick={handleAddToCartClick}
                  />
                ))
              ) : (
                  <p>Loading Latest products...</p>
              )}
        </div>
        </div>


      {/* Responsive Categories Section */}
      <div className="category-section mt-4 px-4 py-2 overflow-x-auto flex space-x-4 md:justify-center bg-lightgray-100">
                {Categories.map((category, index) => (
                    <div
                        key={index}
                        className="min-w-[100px] md:w-40 p-2 bg-white shadow rounded cursor-pointer hover:bg-blue-50"
                        onClick={() => handleSelectOption(category)}
                    >
                        {category}
                    </div>
                ))}
            </div>

      {products.length === 0 ? <SkeletonLoader /> : (
      <div id="product-section" className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
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
