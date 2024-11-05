const { assert, expect } = require("chai")
const { developmentChains } = require("../helper-hardhat-config")
const { network, ethers, deployments } = require("hardhat")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NftMarketplace", function () {
          let nftMarketplace, nftMarketplaceContract, basicNft, basicNftContract
          const PRICE = ethers.utils.parseEther("0.1")
          const TOKEN_ID = 0

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]

              await deployments.fixture(["nftmarketplace", "basicnft"])

              nftMarketplace = await ethers.getContract("NftMarketplace")
              basicNftContract = await ethers.getContract("BasicNft")
              basicNft = basicNftContract.connect(deployer)
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplace.address, TOKEN_ID)
          })

          describe("listItem()", async function () {
              it("revert if price is 0", async function () {
                  await expect(nftMarketplace.listItem(basicNft.address, 0, 0)).to.be.revertedWith(
                      "NftMarketplace__PriceMustBeAboveZero()"
                  )
              })
          })
      })
