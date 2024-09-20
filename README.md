# School Grading System

## Description

This repository contains a decentralized application (DApp) that allows a school to manage and assign grades to students using the Ethereum blockchain. The project consists of a smart contract written in Solidity and a front-end interface developed using React and Ethers.js.

## Features

- **Add Student:** Add a new student to the grading system.
- **Assign Grade:** Assign grades to students for different subjects.
- **Retrieve Grade:** Retrieve grades assigned to students for specific subjects.

## Smart Contract Details

The smart contract (`Assessment.sol`) defines the core functionality for the grading system. It includes methods to add students, assign grades, and retrieve grades.

### Contract Address

The deployed contract address is: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

## Front-End Application

The front-end is a React application that interacts with the smart contract using Ethers.js. It allows users to connect their MetaMask wallet, add students, assign grades, and retrieve grades.

### File Structure

- **index.js:** The main file for the React application. It includes the logic to interact with the smart contract and manage the application's state.

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js and npm installed on your machine.
- **MetaMask**: Install the MetaMask extension in your browser.
