const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const [signer] = await ethers.getSigners();
  const Wallet = await hre.ethers.getContractFactory("Wallet", signer);
  const wallet = await Wallet.deploy();

  await wallet.deployed();

  console.log("Wallet deployed to:", wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });