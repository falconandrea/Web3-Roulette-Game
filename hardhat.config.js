require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    // Change if you need
    goerli: {
      url: process.env.URL_PROVIDER,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
