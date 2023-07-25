const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EasyAsset", () => {
  let EasyAsset, contract, owner, buyerAddress, addr1;

  // parameters for creating an Asset
  const title = "One bedroom Apartment";
  const description = "this is a description";
  const credential = "https://github.com/lamsyA";
  const price = ethers.utils.parseEther("1");

  // parameters for buying an asset
  const id = 0;

  beforeEach(async () => {
    EasyAsset = await ethers.getContractFactory("EasyAsset");
    [owner, buyerAddress, addr1] = await ethers.getSigners();
    contract = await EasyAsset.deploy("EasyAsset", "EAS");
    await contract.deployed();

    // Register and verify the buyerAddress
    await contract._registerUser(25, 12345, "1234567890", "John");
    await contract._verifyUser(25, 12345, "1234567890", "John");

    await contract
      .connect(buyerAddress)
      ._registerUser(25, 12345, "1234567890", "John");
    await contract
      .connect(buyerAddress)
      ._verifyUser(25, 12345, "1234567890", "John");

    await contract.createAsset(title, description, credential, price);
    const result = await contract.getAssets();
  });

  describe("Asset Creation", () => {
    // it('should contain a list of created Asset', async () => {
    //     // await contract.createAsset(title, description, credential, price);
    //     // const result = await contract.getAssets();
    //     expect(result).to.have.lengthOf(1);
    // });

    it("should buy and refund buyer", async () => {
      // await contract.createAsset(title, description, credential, price);
      await contract.connect(buyerAddress).buyAsset(0, { value: price });

      const buyerBeforeRefund = await contract.buyerMap(id);
      expect(buyerBeforeRefund.status).to.equal(1);

      await contract.connect(buyerAddress).refund(0);

      const buyerAfterRefund = await contract.buyerMap(id);
      expect(buyerAfterRefund.status).to.equal(3);
    });

    it("should check the status of the Asset", async () => {
      // await contract.createAsset(title, description, credential, price);
      const result = await contract.assetArray(id);
      expect(result.status).to.equal(0);
    });

    it("should check for the confirmation of the Asset", async () => {
      // await contract.createAsset(title, description, credential, price);
      await contract.connect(buyerAddress).buyAsset(0, { value: price });
      await contract.connect(buyerAddress).confirm(0);
      const result = await contract.assetArray(id);
      expect(result.status).to.equal(4);
    });

    it("should probe asset", async () => {
      // await contract.createAsset(title, description, credential, price);
      await contract.connect(owner).Probe(0);
      const result = await contract.assetArray(id);
      expect(result.status).to.equal(2);
    });

    it("should check the number of Assets", async () => {
      // await contract.createAsset(title, description, credential, price);
      const result = await contract.getAssets();
      expect(result).to.have.lengthOf(1);
    });

    it("should get the buyer of the asset", async () => {
      // await contract.createAsset(title, description, credential, price);
      await contract.connect(buyerAddress).buyAsset(0, { value: price });
      const result = await contract.buyerMap(id);
      expect(result.owner).to.be.equal(buyerAddress.address);
    });
  });
});
