import React from 'react';
import { RiExchangeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { connectWallet } from '../services/Blockchain';
import { useGlobalState } from '../store';

const Navbar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  return (
    <header
      className="flex justify-between items-center p-4 shadow-md
        fixed top-0 left-0 right-0 z-50
        cursor-pointer bg-white shadow-sm shadow-blue-100 md:p-6"
    >
      <div className="flex justify-start items-center 
        text-2xl text-yellow-500 
        hover:text-yellow-400 md:3xl
        "
      >
        <Link
          to="/"
          className="flex justify-start items-center"
        >
          <span>Easy </span>
          <RiExchangeLine />
          <span> Asset</span>
        </Link>
      </div>

      {connectedAccount ? (
        <div
          className="flex justify-center space text-xl"
        >
          <button 
            type="button" 
            className="font-medium leading-tight rounded-md text-white 
            bg-yellow-500 px-2 py-2 shadow-md shadow-lime-100
            uppercase text-base
            transition ease-in duration-200
            hover:bg-slate-100 
            hover:text-black md:px-4
            ">
            {' '}
            {connectedAccount.slice(0, 4) + '...' + connectedAccount.slice(-5)}
          </button>
        </div>
      ) : (
        <div
          className="flex justify-center space text-xl" 
        >
          <button
            type="button"
            className="font-medium leading-tight rounded-md text-white 
            bg-yellow-500 px-2 py-2 shadow-md shadow-lime-100
            uppercase text-base
            transition ease-in duration-200
            hover:bg-slate-100 
            hover:text-black md:px-4
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
