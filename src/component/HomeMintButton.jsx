import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { setGlobalState } from '../store';

const HomeMintButton = () => {
  return (
    <div
      className="absolute right-10 bottom-10 flex space-x-2 
             justify-center"
    >
      <button
        className="flex justify-center items-center mt-10 bg-blue-400 
            rounded-md text-white shadow-md shadow-gray-500 
            px-4 py-2 transition ease-in duration-200
            hover:bg-blue-200 hover:text-slate-700 text-bold leading-tight border-none "
        onClick={() => setGlobalState('showModal', 'scale-100')}
      >
        Add Asset {" "} <BsPlusLg className="" size={20} />
      </button>
    </div>
  );
};

export default HomeMintButton;
