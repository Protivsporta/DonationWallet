require("@nomiclabs/hardhat-web3");

task("withdrawMoney", "Withdraws any amount available on the contract")
  .addParam("address", "Address for withdrawn")
  .addParam("value", "How much you want to withdraw in Wei")
  .setAction(async (taskArgs) => {
    const withdraw = await hre.ethers.getContractAt("Wallet", process.env.CONTRACT_ADDR);
    await withdraw.withdrawMoney(taskArgs.address, taskArgs.value);
    console.log(`${taskArgs.value} Wei was withdrawned to ${taskArgs.address}`);
  })
