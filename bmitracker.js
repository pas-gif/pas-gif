// Function to calculate BMI and store it in localStorage
function calculateBMI() {
    const heightCm = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Convert height from centimeters to meters
    const height = heightCm / 100;

    if (height > 0 && weight > 0) {
        const bmi = weight / (height * height);
        document.getElementById('bmiResult').textContent = bmi.toFixed(2);

        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        document.getElementById('bmiCategory').textContent = 'Category: ' + category;

        // Store the BMI record in localStorage
        storeBMIRecord(bmi, category);
        updateBMITable();
        updateBMIChart();
    } else {
        alert('Please enter valid height and weight.');
    }
}

// Function to store BMI record in localStorage
function storeBMIRecord(bmi, category) {
    let bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    bmiHistory.push({
        date: new Date().toLocaleDateString(),
        bmi: bmi.toFixed(2),
        category: category
    });
    localStorage.setItem('bmiHistory', JSON.stringify(bmiHistory));
}

// Function to update the BMI history table
function updateBMITable() {
    const tableBody = document.getElementById('bmiHistoryTable').getElementsByTagName('tbody')[0];
    const bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate the table with BMI history
    bmiHistory.forEach(record => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = record.date;
        row.insertCell().textContent = record.bmi;
        row.insertCell().textContent = record.category;
    });
}

// Function to update the BMI progress chart
function updateBMIChart() {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    const bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    const labels = bmiHistory.map(record => record.date);
    const data = bmiHistory.map(record => parseFloat(record.bmi));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'BMI Over Time',
                data: data,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to reset the BMI history
function resetBMIHistory() {
    localStorage.removeItem('bmiHistory');
    updateBMITable(); // Clear the table
    updateBMIChart(); // Update the chart to reflect changes
}

// Initialize BMI table and chart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBMITable();
    updateBMIChart();
});
