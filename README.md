# EasyAsset Smart Contract Documentation

## Overview

EasyAsset is a decentralized application (DApp) implemented as a Solidity smart contract on the Ethereum blockchain. It facilitates the creation, buying, and selling of assets represented as non-fungible tokens (NFTs). The contract inherits from OpenZeppelin's ERC721 standard for NFTs and also uses the ReentrancyGuard contract to prevent reentrancy attacks.

The contract takes in the payment as an escrow that allow buyer to confirm the Asset before payment is send to the assset owner and the asset ownership is transfer to the buyer once the buyer confirms the asset.  

## License

This contract is licensed under the MIT License. Please refer to the SPDX-License-Identifier comment at the top of the source code for more details.

## Smart Contract Details

### Contract Features

1. Asset Creation: Users can create new assets (represented as NFTs) and associate them with a title, description, price, and a unique credential. The credential acts as a unique identifier for each asset.

2. Asset Buying: Users can buy assets by sending the specified price in Ether to the contract. Once the payment is made, the asset status changes to "PAID," 

3. Asset Refund: The buyer of an asset can request a refund before the asset status changes to "SOLD." the asset status changes to "OPEN," 

4. Asset Holding: The contract owner can "probe" an asset, putting it on hold. While an asset is on hold, it cannot be bought or sold.

5. Asset Release: The contract owner can release an asset from holding, making it available for buying or selling.

5. Asset Confirm: The buyer of an asset needs to confirm the asset for transfer of ownership to take place and the fund is release to the asset seller. This process ensure on-chain transfer of ownership to buyer from the asset owner.

### Data Structures

1. Enum `assetStatus`: Represents the different statuses an asset can have, including OPEN, PAID, HELD, REFUNDED, and SOLD.

2. Struct `buyer`: Contains information about the buyer of an asset, including their status, ID, amount paid, timestamp, payment confirmation, checked status, owner, and credential.

3. Struct `Asset`: Represents an individual asset and includes fields like probe status, bought status, asset status, timestamp, price, ID, seller address, title, description, and credential.

4. Struct `user`: Contains personal information of a user, including age, national ID, phone number, and first name. (Note: There is no apparent usage of this struct in the current contract).

### Events

1. `assetCreation`: Fired when a new asset is created, providing details about the asset's owner, ID, credential, timestamp, and price.

2. `assetTransfer`: Fired when an asset is transferred from one address to another, providing details about the sender, recipient, token ID, credential, and timestamp.

3. `Action`: General event used to indicate actions performed, such as buying an asset or sending Ether. It provides information about the buyer, seller, timestamp, amount, and payment status.

4. `refundAction`: Fired when a refund is requested, providing information about the asset status before and after the refund request.

### Modifiers

1. `nonReentrant`: Ensures that a function cannot be executed recursively (prevents reentrancy attacks).

### Constructor

The contract constructor initializes the ERC721 token with a name and symbol and sets the contract deployer as the owner.

### Functions

1. `createAsset`: Allows users to create a new asset with a title, description, credential, and price. The asset is associated with a unique NFT token ID, and the owner receives ownership of the newly created NFT.

2. `buyAsset`: Allows users to buy an asset by providing the asset ID and sending the required payment. The asset status changes to "PAID," and ownership transfers to the buyer.

3. `refund`: Allows the buyer of an asset to request a refund.  releasing the asset back to the original seller.

4. `Probe`: Allows the contract owner to put an asset on hold, making it unavailable for buying or selling.

5. `releaseAsset`: Allows the contract owner to release a held asset, making it available for buying or selling again.

6. `confirm`: Allows the buyer of an asset to confirm the purchase after receiving the asset. The contract owner receives the payment, and the asset status changes to "SOLD."

7. `getAssets`: Allows users to get an array of all the assets created.

8. `getRefundedBuyers`: Allows users to get details about refunded buyers for a specific asset ID.

### Internal Function

1. `pay`: Internal function to transfer Ether to a specified address. It is used to handle payments between parties.

### Data Storage

1. `AssetIdExist`: A private mapping that keeps track of whether an asset with a specific ID exists.

2. `AssetExist`: A private mapping that keeps track of whether an asset with a specific credential exists.

3. `refundedBuyers`: A mapping that stores information about refunded buyers for a specific asset ID.

4. `buyerMap`: A public mapping that stores buyer information for a specific asset ID.

5. `assetArray`: An array that holds all the created assets.

6. `owner`: The address of the contract owner.

To clone and run the EasyAsset smart contract on Celo Alfajores testnet, you'll need to follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

2. You will need an Ethereum wallet or a Celo wallet with some testnet CELO tokens for contract deployment and interactions. You can get testnet CELO tokens from the Celo Alfajores Faucet: https://faucet.celo.org/alfajores.

### Clone the Repository

1. Open a terminal or command prompt on your local machine.

2. Clone the EasyAsset repository from GitHub:

```bash
git clone https://github.com/LamsyA/Asset-marketplace.git

cd Asset-marketplace
```

### Configure the Project

 Install the project dependencies using npm:

```bash
npm install
```

 Deploy the project to Alfajores testnet run:
```bash
npx hardhat run scripts/deploy.js --network Alfajores
```

### Testing

The EasyAsset contract comes with test scripts that you can run to ensure its functionality is working correctly. To run the tests:

```bash
npx hardhat test
```

This will execute the test cases defined in the `test/EasyAsset.js` file and verify that the contract behaves as expected.

## Conclusion

By following these steps, you should now have the EasyAsset smart contract deployed and ready to be interacted with on the Celo Alfajores testnet. Make sure to thoroughly test your contract's functionalities.