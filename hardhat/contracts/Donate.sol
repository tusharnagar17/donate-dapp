// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Donate {
    struct Donor {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }
    address payable owner;

    Donor[] public donors;

    constructor() {
        owner = payable(msg.sender);
    }

    function donate(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Unable to donate ether");
        donors.push(Donor(name, message, block.timestamp, msg.sender));
    }

    function getDonor() public view returns (Donor[] memory) {
        return donors;
    }

    // Only owner can withdraw the donations
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        (bool sent, ) = owner.call{value: balance}("");
        require(sent, "Failed to withdraw Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
