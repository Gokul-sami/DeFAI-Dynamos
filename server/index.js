const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Web3 = require('web3');

const app = express();
const port = 3000;

// Use body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Connect to the blockchain – change the provider URL as needed
const web3 = new Web3('http://localhost:8545');

// Replace the following with your contract's ABI and deployed address from Remix
const contractABI = [
  // ... Paste your ABI array here ...
];
const contractAddress = '0xYourDeployedContractAddress';

const predictionContract = new web3.eth.Contract(contractABI, contractAddress);

// API endpoint: Submit a new prediction
app.post('/api/submit-prediction', async (req, res) => {
  const { eventDescription, predictedValue, account } = req.body;
  try {
    const tx = await predictionContract.methods
      .submitPrediction(eventDescription, predictedValue)
      .send({ from: account });
    res.json({ success: true, tx });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API endpoint: Get all predictions
app.get('/api/predictions', async (req, res) => {
  try {
    const count = await predictionContract.methods.getPredictionsCount().call();
    let predictions = [];
    for (let i = 0; i < count; i++) {
      let pred = await predictionContract.methods.getPrediction(i).call();
      predictions.push(pred);
    }
    res.json({ success: true, predictions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
