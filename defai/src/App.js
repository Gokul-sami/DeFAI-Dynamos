import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import { Contract } from "ethers";

let signer = null;

let provider;
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed,
    // so they only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner();
        
        const address = await signer.getAddress(); // Get user's wallet address

        const b=await provider.getBlockNumber()
      
        const balanceWei = await provider.getBalance(address);
        const balanceEther = ethers.formatEther(balanceWei); // Convert from Wei to Ether

        console.log(`Your wallet address: ${address}`);
        console.log(`Your balance: ${balanceEther} ETH`);
        console.log(`Your block: ${b}`);
    
    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

// // The contract ABI (fragments we care about)
        // let abi = [
        //   "function decimals() view returns (uint8)",
        //   "function symbol() view returns (string)",
        //   "function balanceOf(address a) view returns (uint)"
        // ]
        
        // Create a contract; connected to a Provider, so it may
        // only access read-only methods (like view and pure)
        // let contract = new ethers.Contract("0x6B175474E89094C44Da98b954EedeAC495271d0F", abi, provider)
        // const sym = await contract.symbol()
        // // 'DAI'

        // // The number of decimals the token uses
        // let decimals = await contract.decimals()
        // 18n

        // Read the token balance for an account
        // let balance = await contract.balanceOf(address);
// 4000000000000000000000n

    
        // '4000.0'
        // Fetch the balance
        // let abi = [
        //   "function transfer(address to, uint amount)"
        // ]
        
        // // Connected to a Signer; can make state changing transactions,
        // // which will cost the account ether
        // let contract = new Contract("0x6B175474E89094C44Da98b954EedeAC495271d0F", abi, signer)
        
        // // Send 1 DAI
        // let amount = ethers.parseUnits("1.0", 18);
        
        // // Send the transaction
        // let tx = await contract.transfer(address, amount)
        
        // Currently the transaction has been sent to the mempool,
        // but has not yet been included. So, we...
        
        // ...wait for the transaction to be included.
        // await tx.wait()