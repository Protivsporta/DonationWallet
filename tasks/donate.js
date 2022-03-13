require("@nomiclabs/hardhat-web3");

task("donate", "Get donation to contract")
  .addParam("value", "Amount to donate in Wei")
  .setAction(async (taskArgs) => {
    const donation = await hre.ethers.getContractAt("Wallet", process.env.CONTRACT_ADDR);
    await donation.donate({
      value: taskArgs.value
    });
    console.log("Donation sent!")
  });