import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactionCount, settransactionCount] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) {
        console.error("MetaMask not detected!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setSigner(signer);

        // Use signer.address to get balance
        const balance = await provider.getBalance(signer.address);
        setBalance(ethers.formatEther(balance));

        settransactionCount(await provider.getTransactionCount(signer.address));

        console.log("Signer:", signer);
        console.log("Balance:", ethers.formatEther(balance), "ETH");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>MetaMask Signer: {signer ? signer.address : "Not connected"}</p>
        <p>Balance: {balance !== null ? `${balance} ETH` : "Fetching..."}</p>
        <p>Transaction Count: {transactionCount !== null ? `${transactionCount}` : "Fetching..."}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
