
# Simple Banking System

This project is a decentralized banking system built on the Ethereum blockchain using **Solidity** for the smart contract and **React** for the frontend. Users can create accounts, deposit funds, withdraw funds, transfer money to other accounts, and check their balance through the web interface.

## Prerequisites

To run this project locally, you need to have the following installed:

- **Node.js**: [Node.js](https://nodejs.org/en/)
- **MetaMask Extension**: A wallet extension to interact with the Ethereum network. [MetaMask](https://metamask.io/)
- **Hardhat**: To compile, deploy, and test the smart contract. [Hardhat](https://hardhat.org/)
  
## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amis441/simple-banking-system.git
   cd simple-banking-system
   ```

2. **Install dependencies**:
   Install the necessary npm packages.
   ```bash
   npm install
   ```

3. **Configure Hardhat**:
   - If you are using a local Ethereum network, ensure that Hardhat is set up properly in your project.

4. **Compile the Smart Contract**:
   ```bash
   npx hardhat compile
   ```

5. **Deploy the Smart Contract**:
   Deploy the smart contract to your local Ethereum network or public testnet.
   ```bash
   npx hardhat run scripts/deploy.js --network your_network
   ```
   Update the contract address in the `index.js` file.

## Running the Project

1. **Start the React Frontend**:
   ```bash
   npm run dev
   ```
   This will launch the React application on `localhost:3000`.

2. **Connect to MetaMask**:
   Make sure you are connected to the same Ethereum network on MetaMask that the smart contract was deployed to (e.g., Ganache or Ropsten).

## Features

- **Create an Account**: Users can create a new banking account linked to their Ethereum address.
- **Deposit Funds**: Users can deposit Ether into their account.
- **Withdraw Funds**: Users can withdraw Ether from their account.
- **Transfer Funds**: Users can transfer Ether to another account.
- **Check Balance**: Users can view the balance of their account.

## Smart Contract

The smart contract `SimpleBankingSystem.sol` is deployed on the Ethereum blockchain and includes the following functionality:

- **Account Creation**: Users can create an account by calling the `createAccount()` function.
- **Deposit**: Users can deposit Ether using the `deposit()` function, which updates their balance.
- **Withdraw**: The `withdraw()` function allows users to withdraw Ether from their balance.
- **Transfer**: Users can transfer Ether to another account using the `transfer()` function.
- **Get Balance**: The `getBalance()` function returns the balance of the user's account.

### Smart Contract Events:

- `AccountCreated`: Emitted when a new account is created.
- `Deposited`: Emitted when a deposit is made.
- `Withdrawn`: Emitted when a withdrawal is made.
- `Transferred`: Emitted when a transfer is completed.

## Frontend Functionality

The React frontend provides a simple interface for interacting with the smart contract:

- **Deposit Funds**: Allows users to enter an amount in Ether and deposit it into their account.
- **Withdraw Funds**: Users can withdraw a specified amount from their balance.
- **Transfer Funds**: Users can transfer Ether to another Ethereum address.
- **View Balance**: Users can retrieve and display their current balance in Ether.

### Key Components:

- **MetaMask Integration**: The project uses MetaMask for user authentication and interaction with the blockchain.
- **ethers.js**: The Ethereum JavaScript library used to interact with the smart contract.

## Usage

1. **Connect MetaMask**: 
   - On the homepage, click the **"Connect your MetaMask wallet"** button.
   
2. **Deposit Funds**:
   - Enter the amount of Ether you want to deposit and click **Deposit**.

3. **Withdraw Funds**:
   - Enter the amount you want to withdraw and click **Withdraw**.

4. **Transfer Funds**:
   - Enter the recipient's Ethereum address and the amount you want to transfer, then click **Transfer**.

5. **Get Balance**:
   - Click **Get Balance** to display your current balance in Ether.
