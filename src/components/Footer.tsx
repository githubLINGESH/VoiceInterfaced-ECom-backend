import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-darkslategray-100 text-white py-8 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-lg font-medium">&copy; {new Date().getFullYear()} DealOn. All Rights Reserved.</p>
        <p className="text-base mt-4">Join our Affiliate Program and start earning today! Promote products you love and earn a commission on every successful sale.</p>
        <p className="text-sm mt-2">For more details on our Affiliate Program, <a href="#" className="text-blue-400 underline">click here</a>.</p>
        <p className="mt-6">Connect with us:</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-blue-400 hover:text-white transition-colors duration-200">Facebook</a> 
          <a href="#" className="text-blue-400 hover:text-white transition-colors duration-200">Instagram</a> 
          <a href="#" className="text-blue-400 hover:text-white transition-colors duration-200">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
