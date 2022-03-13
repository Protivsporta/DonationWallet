require("@nomiclabs/hardhat-waffle");

require('solidity-coverage');

require("@nomiclabs/hardhat-ethers");

require('dotenv').config();

require ("./tasks/donatorsList.js");

require ("./tasks/donate.js");

require ("./tasks/withdrawMoney.js");

require ("./tasks/donationSumByUser.js");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  plugins: ["solidity-coverage"]
};