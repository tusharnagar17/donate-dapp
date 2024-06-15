const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("Donate", (m)=> {
    const donateContract = m.contract("Donate", [])

    return { donateContract }
})