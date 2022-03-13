require("@nomiclabs/hardhat-web3");

task("donationSumByUser", "Get sum of donations for user")
  .addParam("address", "Donator's address")
  .setAction(async (taskArgs) => {
    const donators = await hre.ethers.getContractAt("Wallet", process.env.CONTRACT_ADDR);
    console.log(await donators.getDonationSumByUser(taskArgs.address));
  })