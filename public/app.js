document.getElementById('predictionForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const eventDescription = document.getElementById('eventDescription').value;
  const predictedValue = document.getElementById('predictedValue').value;
  const account = document.getElementById('account').value;
  
  const response = await fetch('/api/submit-prediction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventDescription, predictedValue, account })
  });
  
  const data = await response.json();
  if (data.success) {
    alert('Prediction submitted successfully!');
    loadPredictions();
  } else {
    alert('Error: ' + data.error);
  }
});

async function loadPredictions() {
  const response = await fetch('/api/predictions');
  const data = await response.json();
  if (data.success) {
    const tbody = document.querySelector('#predictionsTable tbody');
    tbody.innerHTML = '';
    data.predictions.forEach((pred, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index}</td>
        <td>${pred.predictor}</td>
        <td>${pred.eventDescription}</td>
        <td>${pred.predictedValue}</td>
        <td>${pred.resolved}</td>
        <td>${pred.outcome}</td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    alert('Error loading predictions: ' + data.error);
  }
}

// Load predictions when the page loads
window.onload = loadPredictions;
