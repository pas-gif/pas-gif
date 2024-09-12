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
    } else {
        alert('Please enter valid height and weight.');
    }
}
