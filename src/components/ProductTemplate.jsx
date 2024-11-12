import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CopyToClipboard from './clipboard';
import { ArrowRight, Share2, ShoppingCart } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';


const ProductTemplate = ({ product }) => {
  const [showShare, setShowShare] = useState(false);
  const [SelectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // handling add to cart click
  const handleAddToCartClick = (product) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020024] via-[#493628] to-[#AB886D] p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-black/20 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Product Image Section */}
          <div className="relative h-[500px] group p-8 bg-gradient-to-br from-black/40 to-transparent">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full flex items-center justify-center relative"
            >
              {product.imageSrc ? (
                <img
                  className="h-full w-full object-contain rounded-2xl"
                  alt={product.name}
                  src={product.imageSrc}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/70">
                  Image not available
                </div>
              )}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-gradient-to-t from-[#AB886D]/20 to-transparent blur-xl" />
            </motion.div>
          </div>

          {/* Product Details Section */}
          <div className="p-8 space-y-6 bg-white/5">
            {/* Header Section */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-bold text-white font-sora tracking-tight"
              >
                {product.name}
              </motion.h1>
              
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-[#020024]/30 rounded-full text-white/90 text-sm">
                  AMAZON DEAL
                </span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="px-3 py-1 bg-red-500/20 rounded-full text-red-500 text-sm font-semibold"
                >
                  {product.discount}% OFF
                </motion.div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-[#493628]/30 to-[#AB886D]/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-white">₹{product.d_price}</span>
                <span className="text-2xl text-white/60 line-through">₹{product.price}</span>
              </div>
              
              <div className="text-white/80 text-sm">
                Limited time offer on Amazon
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.a
                href={product.link}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block"
              >
                <button className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
                  <span className="text-lg">Shop Now on Amazon</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.a>

              <div className="flex space-x-4"
              onClick={() => handleAddToCartClick(product)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#493628] text-white py-4 rounded-xl font-semibold hover:bg-[#AB886D] transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add To Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowShare(!showShare)}
                  className="px-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Share Options */}
              {showShare && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl"
                >
                  <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                    <CopyToClipboard text={product.link} copyIcon="/pixelarticonscopy.svg" />
                  </motion.div>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={`tg://msg_url?url=${encodeURIComponent(product.link)}`}
                    className="bg-white/20 p-2 rounded-lg"
                  >
                    <img className="w-6 h-6" alt="Telegram" src="/telegram-icon.svg" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={`whatsapp://send?text=${product.link}`}
                    className="bg-white/20 p-2 rounded-lg"
                  >
                    <img className="w-6 h-6" alt="WhatsApp" src="/whatsapp-icon.svg" />
                  </motion.a>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* How to Buy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-gradient-to-b from-transparent to-black/40"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-white">How to buy this product?</h2>
            <div className="space-y-4 text-white/80">
              <div className="bg-white/5 p-6 rounded-xl space-y-4">
                <h3 className="text-lg font-semibold text-white">Steps to Purchase:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#493628] rounded-full flex items-center justify-center text-sm">1</span>
                    <span>Use the special link above to access the Amazon product page</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#493628] rounded-full flex items-center justify-center text-sm">2</span>
                    <span>Price may vary due to different sellers or ended offers</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Disclaimer:</h3>
                <p className="text-sm text-white/70">
                  <span className="font-semibold">Disclosure:</span> We may receive a small commission for purchases made through our links.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductTemplate;