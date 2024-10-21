import React from 'react';
import { FunctionComponent } from "react";
import Navbarr from "../components/navbarr";
import Footer from "../components/Footer"; // Fixed path for Footer

const AboutPage: FunctionComponent = () => {
  return (
    <div className='text-left text-white font-inter'>
      <div className="relative bg-white w-full min-h-screen overflow-hidden text-left text-4xl md:text-5xl text-white font-inter">
        <Navbarr />
        <div className="relative max-w-screen-lg mx-auto p-4">
          <div className="bg-whitesmoke-200 w-full h-auto p-8 rounded-lg shadow-md">
            <h1 className="text-darkslategray-100 text-3xl md:text-4xl font-bold mb-6">About</h1>
            <p className="text-darkslategray-100 text-base md:text-lg font-light leading-relaxed">
              dash is a one-stop platform for Loots, Deals, Offers, and Coupons in the world of online shopping. With Roobai.com, rest assured you will get the most updated coupons and offers present online. We try our best to remain updated & serve our customers to avail all the time.
            </p>
          </div>

          <div className="mt-12 text-black">
            <h2 className="text-darkslategray-100 text-2xl md:text-3xl font-semibold mb-4">What We Do?</h2>
            <p className="text-darkslategray-100 text-base md:text-lg font-light leading-relaxed">
              The answer is simple; we help people save money online. We search for the best deals and offers across various sections of the retailing industry and present them to our shoppers. This helps them make better shopping decisions and save more using our deals and offers.
            </p>
            <p className="text-darkslategray-100 text-base md:text-lg font-light leading-relaxed mt-4">
              We understand the essence of saving money, and that is why we remain dedicated and persistent in finding the best deals. Whether you are looking for the lowest prices, discount coupons, freebies, or contest giveaways, we provide it all in one place.
            </p>
            <p className="text-darkslategray-100 text-base md:text-lg font-light leading-relaxed mt-4">
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
