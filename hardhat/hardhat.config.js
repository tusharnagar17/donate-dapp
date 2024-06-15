require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      chainId: 31337
    },
    sepolia: {
      url: "",
      chainId: 11155111
    }
  }

};
