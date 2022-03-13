require("@nomiclabs/hardhat-web3");

task("donatorsList", "Get list of donators")
  .setAction(async (taskArgs) => {
    const donators = await hre.ethers.getContractAt("Wallet", process.env.CONTRACT_ADDR);
    console.log(await donators.getDonatorsList())
  })