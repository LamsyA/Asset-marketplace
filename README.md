# EasyAsset Contract Documentation

## Overview

The EasyAsset contract is an Ethereum smart contract that allows users to create, buy, and sell assets in a decentralized manner. It is built on the Ethereum blockchain and follows the ERC-721 standard for non-fungible tokens (NFTs). The contract also includes functionality for user verification and asset management.

## Contract Details

### SPDX-License-Identifier

The contract starts with a SPDX-License-Identifier comment to indicate the license under which the contract is released. In this case, it uses the MIT license.

### Pragma

```
pragma solidity ^0.8.0;
```

This statement specifies the version of the Solidity programming language required by the contract. In this case, the contract requires Solidity version 0.8.0 or higher.

### Libraries

The contract imports two external libraries using OpenZeppelin contracts:

1. ERC721.sol: This is the implementation of the ERC-721 standard for non-fungible tokens.
2. ReentrancyGuard.sol: This library helps prevent reentrancy attacks by managing reentrant calls.

### State Variables

The contract has several state variables to store essential data:

1. `owner`: Stores the address of the contract owner.
2. `Asset`: A struct representing an asset that users can buy and sell.
3. `buyer`: A struct representing a buyer who shows interest in purchasing an asset.
4. `user`: A struct representing a user's details, including age, national ID, phone number, and first name.
5. `AssetIdExist`: A mapping to keep track of the existence of assets based on their IDs.
6. `AssetExist`: A mapping to check if an asset with a given credential already exists.
7. `refundedBuyers`: A mapping to store buyers who have been refunded.
8. `buyerMap`: A mapping to associate asset IDs with their respective buyers.
9. `usersDetail`: A mapping to store users' details based on their national ID.
10. `verified`: A mapping to verify user addresses.
11. `assetArray`: An array to store all the assets.

### Events

The contract emits several events to notify external applications about important state changes:

1. `assetCreation`: Fired when a new asset is created.
2. `assetTransfer`: Fired when an asset is transferred from one user to another.
3. `sold`: Fired when an asset is sold and ownership is transferred to the buyer.
4. `Action`: Fired when a buyer pays for an asset or performs some action related to it.
5. `refundAction`: Fired when an asset is refunded or its refund action is initiated.

### Constructor

The contract constructor takes two parameters: `_name` and `_symbol`. It initializes the ERC721 token with a name and a symbol. The `msg.sender` becomes the contract's owner.

### User Verification

The contract includes functions for user verification:

1. `_registerUser`: Allows users to register their details (age, national ID, phone number, and first name).
2. `_verifyUser`: Verifies a user's details based on their national ID, phone number, age, and first name.
3. `isVerified`: A modifier that requires the user to be verified before executing certain functions.

### Asset Management

The contract provides functions for asset creation, buying, and selling:

1. `createAsset`: Allows users to create new assets with a title, description, credential, and price.
2. `buyAsset`: Enables users to buy assets by providing the asset ID and the required payment.
3. `refund`: Allows buyers to request a refund for an asset they purchased.
4. `Probe`: Allows the contract owner to probe an asset, releasing it from being held and potentially refunding the buyer.

### Other Functions

1. `releaseAsset`: Allows the contract owner to release an asset that was previously held, making it available for sale again.
2. `getAssets`: Retrieves an array of all the assets currently available for sale.
3. `getRefundedBuyers`: Retrieves information about buyers who have been refunded.

## Usage

Users can interact with the contract to create assets, buy/sell assets, and request refunds. Before taking any actions, users need to be registered and verified.

### Asset Creation

1. Call the `_registerUser` function to register your details.
2. Call the `_verifyUser` function to get verified based on your provided details.
3. Once verified, call the `createAsset` function to create a new asset, providing the title, description, credential, and price.

### Asset Buying

1. Make sure you are verified and have enough ether in your account to buy an asset.
2. Call the `buyAsset` function, providing the asset ID as a parameter and sending the required payment in ether.

### Asset Refund

1. Ensure you are the buyer of the asset and have the asset's ID.
2. Call the `refund` function to initiate the refund process.

### Asset Probing and Releasing

1. Only the contract owner can probe an asset using the `Probe` function. This action releases the asset from being held and refunds the buyer if the asset was in the "PAID" status.
2. The owner can release an asset that was previously held using the `releaseAsset` function.

