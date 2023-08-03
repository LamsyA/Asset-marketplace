import React from 'react';
import Typewriter from 'typewriter-effect';
import { setGlobalState, useGlobalState } from '../store';
import { MdVerified } from 'react-icons/md';

const Hero = () => {
  const [showModal] = useGlobalState('showModal');
  const [verified] = useGlobalState('verified');

  return (
    <div className="min-h-screen bg-gray-800 pt-24 md:pt-40 md:pb-10 px-5">
      <div className="flex flex-col md:flex-row md:items-start justify-start">
        <div className="flex flex-col px-4 md:px-8 pt-8 md:pt-0 pb-4 md:py-6 h-screen md:w-1/2">
          <div className="w-full">
            <h1 className="text-5xl md:text-6xl text-white font-poppins mb-12 tracking-tight">
              Looking for a new way to showcase and sell your assets?
            </h1>
          </div>
        
          <div className="flex items-start justify-center">
            <button
              className="inline-block w-44 mt-10 justify-center bg-purple-600 px-4 py-2
              rounded-md text-xl text-white hover:bg-purple-800
              transition duration-200 uppercase font-semibold"
              onClick={() => setGlobalState('showModal', 'scale-100')}
            >
              Mint Asset
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center px-4 md:px-8 pt-0 w-full md:w-1/2">
          <div className="flex flex-col text-left justify-center md:px-8 rounded-md py-4 md:py-6 bg-purple-900">
            <p className="text-left text-xl md:text-2xl text-purple-400 mb-6 font-semibold">
              Our platform allows you to:
            </p>
            <div className="px-4 md:px-8">
              <ol className="text-white list-disc font-poppins list-outside leading-6">
                <li className="pb-2">Mint your assets to NFTs</li>
                <li className="pb-2">Display them with backing documents that can be bought by anyone.</li>
                <li className="pb-2">Streamline ownership transfer, making the buying and selling process as smooth as possible.</li>
                <li className="pb-2">Ensure that ownership is transferred securely and seamlessly.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
