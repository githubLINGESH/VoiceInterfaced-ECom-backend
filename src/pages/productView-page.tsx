import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from "components/navbar/navbar";
import ProductTemplate from "../components/ProductTemplate";
import VoiceInterface from "../components/voiceInterface/voiceInterface";
import Userinfo from "components/userinfo";
import axios from 'axios';

type ProductView3Props = {};

const ProductView: FunctionComponent<ProductView3Props> = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const location = useLocation();
  const [product, setProduct] = useState<any>();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [IsClicked, setIsClicked] = useState(false);

  // Handle profile click
  const handleProfileClick = () => {
    setIsClicked(!IsClicked);
  };

  const handleVoiceOption = () => {
    setIsVoiceOpen(!isVoiceOpen);
  };

  console.log("Fetching", productId);

  // Fetch product data if not passed via state
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prod/product/${productId}`);
        setProduct(response.data); // Set the fetched product data
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    // Check if product data is passed via location.state, otherwise fetch from server
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else if (productId) {
      fetchProduct(); // Fetch product data if accessed directly via URL
    }
  }, [productId, location.state]);

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
      {isVoiceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleVoiceOption}></div>
      )}

      <div className="py-20 flex items-center justify-center">
        {product ? (
          <ProductTemplate product={product} />
        ) : (
          <p>Loading product...</p>
        )}
      </div>
    </div>
  );
};

export default ProductView;
