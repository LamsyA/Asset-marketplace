import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black font-poppins text-white py-2">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EasyAsset. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
