const hre = require("hardhat");

async function main() {
  const EasyAsset = await hre.ethers.getContractFactory("EasyAsset");
  const easyAsset = await EasyAsset.deploy("EassyAssetNFT", "EAT");

  await easyAsset.deployed();

  
  

  console.log(`EasyAsset deployed to ${easyAsset.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
