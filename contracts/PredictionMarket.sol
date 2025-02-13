// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PredictionMarket {
    // Structure to store each prediction
    struct Prediction {
        address predictor;
        string eventDescription;
        uint256 predictedValue;
        bool resolved;
        uint256 outcome; // Actual outcome once resolved
    }
    
    // Dynamic array to store predictions
    Prediction[] public predictions;
    
    // Events to log when a prediction is submitted and when it’s resolved
    event PredictionSubmitted(
        uint256 indexed predictionId,
        address indexed predictor,
        string eventDescription,
        uint256 predictedValue
    );
    event PredictionResolved(
        uint256 indexed predictionId,
        uint256 outcome
    );
    
    // Submit a new prediction
    function submitPrediction(string calldata _eventDescription, uint256 _predictedValue) external {
        predictions.push(Prediction(msg.sender, _eventDescription, _predictedValue, false, 0));
        emit PredictionSubmitted(predictions.length - 1, msg.sender, _eventDescription, _predictedValue);
    }
    
    // Resolve a prediction (in a production system, this could be triggered by an off-chain AI process)
    function resolvePrediction(uint256 _predictionId, uint256 _actualOutcome) external {
        require(_predictionId < predictions.length, "Invalid prediction ID");
        Prediction storage pred = predictions[_predictionId];
        require(!pred.resolved, "Prediction already resolved");
        pred.resolved = true;
        pred.outcome = _actualOutcome;
        emit PredictionResolved(_predictionId, _actualOutcome);
    }
    
    // Get the total number of predictions
    function getPredictionsCount() external view returns (uint256) {
        return predictions.length;
    }
    
    // Retrieve a prediction's details
    function getPrediction(uint256 _predictionId) external view returns (Prediction memory) {
        require(_predictionId < predictions.length, "Invalid prediction ID");
        return predictions[_predictionId];
    }
}
