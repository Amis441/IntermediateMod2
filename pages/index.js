import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleBankingSystemABI from "../artifacts/contracts/Assessment.sol/SimpleBankingSystem.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [bankingSystem, setBankingSystem] = useState(undefined);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferRecipient, setTransferRecipient] = useState("");
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
  const bankingSystemABI = SimpleBankingSystemABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getBankingSystemContract();
  };

  const getBankingSystemContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const bankingSystemContract = new ethers.Contract(
      contractAddress,
      bankingSystemABI,
      signer
    );

    setBankingSystem(bankingSystemContract);
  };

  const deposit = async () => {
    if (bankingSystem && depositAmount > 0) {
      let tx = await bankingSystem.deposit({
        value: ethers.utils.parseEther(depositAmount.toString()),
      });
      await tx.wait();
      alert("Deposit successful");
      getBalance();
    }
  };

  const withdraw = async () => {
    if (bankingSystem && withdrawAmount > 0) {
      let tx = await bankingSystem.withdraw(
        ethers.utils.parseEther(withdrawAmount.toString())
      );
      await tx.wait();
      alert("Withdrawal successful");
      getBalance();
    }
  };

  const transfer = async () => {
    if (bankingSystem && transferRecipient && transferAmount > 0) {
      let tx = await bankingSystem.transfer(
        transferRecipient,
        ethers.utils.parseEther(transferAmount.toString())
      );
      await tx.wait();
      alert("Transfer successful");
      getBalance();
    }
  };

  const getBalance = async () => {
    if (bankingSystem) {
      const balance = await bankingSystem.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this system.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount} className="btn">
          Please connect your Metamask wallet
        </button>
      );
    }

    return (
      <div className="banking-system">
        <p className="account-info">Your Account: {account}</p>
        <div className="form-group">
          <h3>Deposit</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
            placeholder="Amount (ETH)"
            className="input"
          />
          <button onClick={deposit} className="btn">
            Deposit
          </button>
        </div>
        <div className="form-group">
          <h3>Withdraw</h3>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
            placeholder="Amount (ETH)"
            className="input"
          />
          <button onClick={withdraw} className="btn">
            Withdraw
          </button>
        </div>
        <div className="form-group">
          <h3>Transfer</h3>
          <input
            type="text"
            value={transferRecipient}
            onChange={(e) => setTransferRecipient(e.target.value)}
            placeholder="Recipient Address"
            className="input"
          />
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(parseFloat(e.target.value))}
            placeholder="Amount (ETH)"
            className="input"
          />
          <button onClick={transfer} className="btn">
            Transfer
          </button>
        </div>
        <div className="form-group">
          <h3>Get Balance</h3>
          <button onClick={getBalance} className="btn">
            Get Balance
          </button>
          {balance !== undefined && (
            <p className="balance-info">Balance: {balance} ETH</p>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Simple Banking System!</h1>
      </header>
      {initUser()}
      <style jsx>{`
  body {
    margin: 0;
    padding: 0;
    height: 100vh; /* Full viewport height */
    background-image: url('/bg.jpg'); /* Your background image */
    background-size: cover; /* Ensures the image covers the entire screen */
    background-position: center;
    background-repeat: no-repeat; /* No repetition of the image */
    display: flex;
    justify-content: center; /* Horizontally center the form */
    align-items: center; /* Vertically center the form */
    font-family: Arial, sans-serif;
  }

  .container {
    text-align: center;
    max-width: 600px;
    padding: 30px;
    background: rgba(0, 0, 0, 0.7); /* Semi-transparent dark background for readability */
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: #fff; /* White text for better contrast */
  }

  header h1 {
    color: #f8f9fa; /* Light color for the header */
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 100%;
    max-width: 400px;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    width: 150px; /* Set width for consistent button sizing */
  }

  button:hover {
    background-color: #0056b3;
  }
`}</style>

    </main>
  );
}
