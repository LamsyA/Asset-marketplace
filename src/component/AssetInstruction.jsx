import React from 'react';

const AssetInstructions = () => {
  return (
    <div className="relative w-full bg-black font-poppins
                  text-white
                  flex flex-col justify-between items-center">
      <div className="flex flex-col py-4 md:py-8 px-4
                      md:w-1/2">
        <div className="mx-auto bg-[#101010] rounded-md p-4 transition duration-300 ease-in-out  
                        hover:scale-105">
          <h2 className=" flex items-center justify-center text-2xl font-bold mb-4 rounded-md p-2
           transition duration-300 ease-in-out cursor-pointer">
            How to Create an Asset
          </h2>
          <div className="flex justify-center items-center">
          <ul className=" list-decimal pl-4 ">
            <li className=" mb-2">
              Ensure you are a verified user. If not, register and verify your account.
            </li>
            <li className="mb-2">Click on the "Create Asset" button on the platform.</li>
            <li className="mb-2">
              Fill in the necessary details for the asset, such as title, description, and price.
            </li>
            <li className="mb-2">Provide a unique credential for the asset.</li>
            <li className="mb-2">Submit the asset creation form.</li>
            <li className="mb-2">The asset will be created and listed on the platform for sale.</li>
          </ul>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col py-4 md:py-8 px-4
                      md:w-1/2">
        <div className="mx-auto bg-[#101010] rounded-md p-4 transition duration-300 ease-in-out  
                        hover:scale-105">
          <h2 className="
          flex items-center justify-center text-2xl font-bold mb-4 rounded-md p-2
           transition duration-300 ease-in-out 
           cursor-pointer">
            How to Buy an Asset
          </h2>
          <ul className="list-decimal pl-4 text-start items-center">
            <li className="mb-2">
              Ensure you are a verified user. If not, register and verify your account.
            </li>
            <li className="mb-2">Browse through the available assets on the platform.</li>
            <li className="mb-2">Click on the asset you want to buy.</li>
            <li className="mb-2">Review the asset details and confirm your interest in buying.</li>
            <li className="mb-2">Click on buy button to buy asset.</li>
            <li className="mb-2">
              Click on  confirm asset button to comfirm the purchase of asset
              </li>
              <li className="mb-2">
              Transfer of ownership of the asset will be done automatically.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssetInstructions;
