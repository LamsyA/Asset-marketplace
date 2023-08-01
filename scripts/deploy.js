const fs = require("fs");
const hre = require("hardhat");

async function saveAddressToFile(address) {
  const data = {
    address: address,
  };
  const fileName = "contract-address.json";
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  console.log(`Contract address saved to ${fileName}`);
}

async function main() {
  const EasyAsset = await hre.ethers.getContractFactory("EasyAsset");
  const easyAsset = await EasyAsset.deploy("EassyAssetNFT", "EAT");

  await easyAsset.deployed();

  const contractAddress = easyAsset.address;
  console.log(`EasyAsset deployed to ${contractAddress}`);

  await saveAddressToFile(contractAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
