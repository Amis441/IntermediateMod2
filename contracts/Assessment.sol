// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBankingSystem {

    // Event to log a new account creation
    event AccountCreated(address accountHolder);
    
    // Event to log a deposit transaction
    event Deposited(address accountHolder, uint256 amount);
    
    // Event to log a withdrawal transaction
    event Withdrawn(address accountHolder, uint256 amount);
    
    // Event to log a transfer transaction
    event Transferred(address from, address to, uint256 amount);

    mapping(address => uint256) public balances;

    // Function to create a new account
    function createAccount() public {
        require(balances[msg.sender] == 0, "Account already exists");
        emit AccountCreated(msg.sender);
    }

    // Function to deposit funds into the account
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Function to withdraw funds from the account
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Function to transfer funds from the caller's account to another account
    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transferred(msg.sender, to, amount);
    }

    // Function to check the balance of an account
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
