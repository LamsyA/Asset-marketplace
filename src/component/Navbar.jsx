import React from 'react';
import { RiExchangeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { connectWallet } from '../services/Blockchain';
import { useGlobalState } from '../store';

const Navbar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  return (
    <header
      className="fixed flex justify-between items-center p-6
        top-0 left-0 right-0 z-50
        h-18 md:h-20
        bg-gradient-to-r from-[#274046] to-purple-400 
        bg-opacity-20 backdrop-blur-md"
    >
      <div className="font-kanit text-white hover:text-purple-400">
      <Link
        to="/"
        className="flex justify-start items-center text-2xl
            "
      >
        <RiExchangeLine />
        <span>EasyAsset</span>
      </Link>
      </div>

      {connectedAccount ? (
        <div
          className="
          font-medium font-poppins leading-tight uppercase
          bg-white px-5 py-2
          rounded-md text-slate-700
          transition duration-200 ease-in
          hover:bg-slate-200"
        >
          <button type="button" className="font-medium leading-tight  ">
            {' '}
            {connectedAccount.slice(0, 4) + '...' + connectedAccount.slice(-5)}
          </button>
        </div>
      ) : (
        <div
          className=" flex justify-center space"
        >
          <button
            type="button"
            className="
            font-medium font-poppins leading-tight uppercase
            bg-white px-2 md:px-5 py-2
            rounded-md text-slate-700
            transition duration-200 ease-in
            hover:bg-slate-200
            "
            onClick={connectWallet}
          >
            {' '}
            Connect Wallet{' '}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
