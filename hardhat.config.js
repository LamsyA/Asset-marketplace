require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY , CELO_URL} = process.env;
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/abis",
  },
  mocha: {
    timeout: 40000,
  },
  networks: {
    // localhost: {
    //   chainId: 31337
    // },
   
    Alfajores:{
      url: CELO_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    chainId: 44787

    },
  },
};
