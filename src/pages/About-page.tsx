import React from 'react';
import { useState } from 'react';
import { FunctionComponent } from "react";
import Navbar from 'components/navbar/navbar';
import Footer from "../components/Footer";

const AboutPage: FunctionComponent = () => {
  const [OpenVoice, SetVoiceInterfaceOpen] = useState(false);
  const [IsClicked, setIsClicked] = useState(false);


    //voice interface handling
    const handleVoiceOption = () => {
      SetVoiceInterfaceOpen(!OpenVoice);
    }

      //handling profile click

  const handleProfileClick = () =>{
    setIsClicked(!IsClicked);
  };

  return (
    <div className="text-left font-inter">
      <div className="relative bg-white w-full min-h-screen overflow-hidden text-left font-inter">
      <Navbar handleVoiceOption={handleVoiceOption} handleProfileClick={handleProfileClick}/>
        <div className="relative m-20 max-w-screen-lg mx-auto p-6 md:p-10">
          <div className="bg-[#AB886D] w-full h-auto p-8 rounded-lg shadow-lg">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-6">About</h1>
            <p className="text-white text-base md:text-lg font-light leading-relaxed">
              dash is a one-stop platform for Loots, Deals, Offers, and Coupons in the world of online shopping. With Roobai.com, rest assured you will get the most updated coupons and offers present online. We try our best to remain updated & serve our customers to avail all the time.
            </p>
          </div>

          <div className="mt-12 text-black">
            <h2 className="text-[#AB886D] text-2xl md:text-3xl font-semibold mb-4">What We Do?</h2>
            <p className="text-gray-700 text-base md:text-lg font-light leading-relaxed">
              The answer is simple; we help people save money online. We search for the best deals and offers across various sections of the retailing industry and present them to our shoppers. This helps them make better shopping decisions and save more using our deals and offers.
            </p>
            <p className="text-gray-700 text-base md:text-lg font-light leading-relaxed mt-4">
              We understand the essence of saving money, and that is why we remain dedicated and persistent in finding the best deals. Whether you are looking for the lowest prices, discount coupons, freebies, or contest giveaways, we provide it all in one place.
            </p>
            <p className="text-gray-700 text-base md:text-lg font-light leading-relaxed mt-4">
              With our application, you can get the best offers & deals from top online shopping sites like Amazon. Accessing the app is quick and ad-free, with less app memory usage and a lot of notifications through Telegram, WhatsApp.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
