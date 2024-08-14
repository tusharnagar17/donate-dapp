require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config")

const SEPOLIA_RPC_URL = process.env.RPC_URL || ""
const SEPOLIA_PRIVATE_KEY = process.env.PRIVATE_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      chainId: 31337,
    },
    sepolia: {
      url: `${SEPOLIA_RPC_URL}`,
      chainId: 11155111,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`]
    },
  },
};
