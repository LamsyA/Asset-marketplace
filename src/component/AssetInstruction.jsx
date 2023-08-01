import React from 'react';

const AssetInstructions = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col py-8 px-4">
        <div className="mx-auto bg-teal-100 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105">
          <h2 className="flex items-center justify-center text-2xl font-bold mb-4 bg-orange-200 rounded-md p-2
           transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white cursor-pointer">
            How to Create an Asset
          </h2>
          <ul className="list-none pl-4">
            <li className="mb-2">
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

      <div className="flex flex-col py-8 px-4">
        <div className="bg-teal-100 rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105">
          <h2 className="flex items-center justify-center text-2xl font-bold mb-4 bg-orange-200 rounded-md p-2
           transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white cursor-pointer">
            How to Buy an Asset
          </h2>
          <ul className="list-none pl-4">
            <li className="mb-2">
              Ensure you are a verified user. If not, register and verify your account.
            </li>
            <li className="mb-2">Browse through the available assets on the platform.</li>
            <li className="mb-2">Click on the asset you want to buy.</li>
            <li className="mb-2">Review the asset details and confirm your interest in buying.</li>
            <li className="mb-2">Send the required payment amount to the seller.</li>
            <li className="mb-2">
              The seller will confirm the payment and transfer ownership of the asset to you.
            </li>
            <li className="mb-2">You will receive the asset in your account.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssetInstructions;
